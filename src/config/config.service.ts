import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
    private getEnv(name: string): string {
        const env = process.env[name];
        if (env) {
            return env;
        }
        throw new Error(`'${name}' is undefined.`);
    }

    get jwtSecret(): string {
        return this.getEnv('JWT_SECRET');
    }

    get jwtExpire(): string {
        return '60d';
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: this.getEnv('POSTGRES_URL'),
            entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
            synchronize: true,
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            ssl: process.env.NODE_ENV === 'production',
        };
    }
}
