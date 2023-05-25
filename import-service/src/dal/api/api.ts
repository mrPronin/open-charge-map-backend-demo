import { injectable } from 'inversify';
import apisauce, { ApisauceInstance } from 'apisauce';
import axios from 'axios';
import fs from 'fs';
import { plainToClass } from 'class-transformer';
import { CONSTANTS } from '@domain/constants.js';

export interface API {
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T>;

  fetchAndStoreToFile(
    url: string,
    path: string,
    timeout: number,
    params?: Record<string, unknown>
  ): Promise<void>;
}

@injectable()
export class APIImplementation implements API {
  private readonly api: ApisauceInstance;

  private readonly defaultParameters: Record<string, unknown>;

  constructor(url: string, apiKey: string) {
    this.api = apisauce.create({
      baseURL: url,
      headers: {
        Accept: 'application/json',
      },
    });
    this.defaultParameters = {
      key: apiKey,
      client: CONSTANTS.OCM_CLIENT_NAME,
    };
  }

  async get<T = any>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T> {
    const response = await this.api.get<T>(
      url,
      { ...this.defaultParameters, ...params },
      {
        transformResponse:
          objectType &&
          ((res) =>
            plainToClass(objectType, res, {
              excludeExtraneousValues: true,
            })),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to GET ${url} - ${response.problem}`);
    }
    return response.data;
  }

  async fetchAndStoreToFile(
    url: string,
    path: string,
    timeout = 30 * 60 * 1000,
    params?: Record<string, unknown>
  ): Promise<void> {
    const startTime = new Date();
    let downloaded = 0;

    const source = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
      source.cancel('Request timed out');
    }, timeout);

    const response = await this.api.axiosInstance.get(url, {
      params: { ...this.defaultParameters, ...params },
      responseType: 'stream',
      cancelToken: source.token,
    });

    const fileStream = fs.createWriteStream(path);

    const writeData = (chunk: any) => {
      downloaded += chunk.length;
      const readyForMore = fileStream.write(chunk);
      if (!readyForMore) {
        response.data.pause();
        fileStream.once('drain', () => {
          response.data.resume();
        });
      }
      const logString = `Downloaded ${(downloaded / (1024 * 1024)).toFixed(
        2
      )} MB`;
      console.log(logString);
    };

    response.data.on('data', writeData);

    return new Promise<void>((resolve, reject) => {
      response.data.on('end', () => {
        console.log(`${path} downloaded successfully.`);
        fileStream.end();
        clearTimeout(timeoutId);
        resolve();
      });

      response.data.on('error', (err) => {
        console.log('error', err);
        clearTimeout(timeoutId);
        reject(err);
      });

      response.data.on('timeout', () => {
        console.log('got timeout event');
      });

      fileStream.on('error', (err) => {
        console.log('error', err);
        clearTimeout(timeoutId);
        reject(err);
      });
    });
  }
}

type Unboxed<T> = T extends (infer U)[] ? U : T;
