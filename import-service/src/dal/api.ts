import { ApisauceInstance, create } from 'apisauce';
import { plainToClass } from 'class-transformer';

export interface API {
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T>;
}

export class APIImplementation {
  api: ApisauceInstance;

  constructor(url: string) {
    this.api = create({
        baseURL: url
    });
  }

  async get<T = any>(
    url: string,
    params?: Record<string, unknown>,
    objectType?: { new (): Unboxed<T> }
  ): Promise<T> {
    const res = await this.api.get<T>(url, params, {
      transformResponse: objectType && ((res) => plainToClass(objectType, res)),
    });

    if (!res.ok) {
      throw new Error(`Failed to GET ${url} - ${res.problem}`);
    }
    return res.data;
  }
}

type Unboxed<T> = T extends (infer U)[] ? U : T;
