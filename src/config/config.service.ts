import { StorageOptions } from '@google-cloud/storage';
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

    get gcloudStorageOptions(): StorageOptions {
        return {
            projectId: this.getEnv('GOOGLE_PROJECT_ID'),
            credentials: JSON.parse(this.getEnv('GCLOUD_SERVICE_KEY_BASE64')),
        };
    }

    get gcloudBucketName(): string {
        return this.getEnv('GCLOUD_BUCKET_NAME');
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
