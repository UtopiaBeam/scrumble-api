import { Module } from '@nestjs/common';
import { EpicService } from './epic.service';
import { EpicResolver } from './epic.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { EpicSchema, Epic } from '../models/epic.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Epic.name, schema: EpicSchema }]),
    ],
    providers: [EpicService, EpicResolver],
})
export class EpicModule {}
