import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private getEnv(name: string): string {
    const env = process.env[name];
    if (env) {
      return env;
    }
    throw new Error(`'${name}' is undefined.`);
  }

  get mongoUrl(): string {
    return this.getEnv('MONGO_URL');
  }
}
