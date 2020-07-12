import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Sprint } from './sprint.model';
import { Ref } from '../types/ref';

@Schema({ timestamps: true })
export class DailyReport extends Document {
    @Prop({ required: true })
    remainingPoint: number;

    @Prop({ type: Types.ObjectId, ref: 'Sprint' })
    sprint: Ref<Sprint>;
}

export const DailyReportSchema = SchemaFactory.createForClass(DailyReport);
