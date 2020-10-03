import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
    providers: [FileService],
    exports: [FileModule],
})
export class FileModule {}
