import { injectable } from 'inversify';
import { ApisauceInstance, create } from 'apisauce';
import { plainToClass } from 'class-transformer';

export interface API {
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T>;
}

@injectable()
export class APIImplementation {
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
    };
  }

  async get<T = any>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T> {
    const res = await this.api.get<T>(
      url,
      { ...params, ...this.defaultParameters },
      {
        transformResponse:
          objectType && ((res) => plainToClass(objectType, res)),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to GET ${url} - ${res.problem}`);
    }
    return res.data;
  }
}

type Unboxed<T> = T extends (infer U)[] ? U : T;
