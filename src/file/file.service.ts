import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { removeSync } from 'fs-extra';
import { ConfigService } from '../config/config.service';
import { FileDTO, FileUrlDTO } from './dto/file.dto';

@Injectable()
export class FileService {
    private readonly bucket: Bucket;

    constructor(config: ConfigService) {
        const storage = new Storage(config.gcloudStorageOptions);
        this.bucket = storage.bucket(config.gcloudBucketName);
    }

    async getFile(name: string): Promise<FileUrlDTO> {
        try {
            const file = this.bucket.file(name);
            const HOUR_IN_SEC = 24 * 60 * 60 * 1000;
            const { contentType } = (await file.getMetadata())[0];
            const signedUrl = (
                await file.getSignedUrl({
                    action: 'read',
                    expires: Date.now() + HOUR_IN_SEC,
                })
            )[0];
            return { contentType, signedUrl };
        } catch {
            return null;
        }
    }

    async upload(name: string, file: FileDTO) {
        await this.bucket.upload(file.path, {
            destination: name,
            contentType: file.mimetype,
            resumable: false,
        });
        removeSync(file.path);
    }
}
