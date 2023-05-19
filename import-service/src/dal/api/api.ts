import { injectable } from 'inversify';
import { ApisauceInstance, create } from 'apisauce';
import { plainToClass } from 'class-transformer';
import { CONSTANTS } from "@domain/constants.js";

export interface API {
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T>;
}

@injectable()
export class APIImplementation implements API {
  private readonly api: ApisauceInstance;
  private readonly defaultParameters: Record<string, unknown>;

  constructor(url: string, apiKey: string) {
    this.api = create({
      baseURL: url,
      headers: {
        Accept: 'application/json',
      },
    });
    this.defaultParameters = {
      key: apiKey,
      client: CONSTANTS.ocmClientName,
    };
  }

  async get<T = any>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T> {
    const res = await this.api.get<T>(
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

    if (!res.ok) {
      throw new Error(`Failed to GET ${url} - ${res.problem}`);
    }
    return res.data;
  }
}

type Unboxed<T> = T extends (infer U)[] ? U : T;