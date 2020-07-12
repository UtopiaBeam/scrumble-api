import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Board } from './board.model';
import { Ref } from '../types/ref';
import { Epic } from './epic.model';

@Schema({ timestamps: true })
export class Sprint extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ type: [Types.ObjectId], ref: 'Board', default: [] })
    boards: Ref<Board>[];

    @Prop({ type: [Types.ObjectId], ref: 'Epic', default: [] })
    epics: Ref<Epic>[];
}

export const SprintSchema = SchemaFactory.createForClass(Sprint);
