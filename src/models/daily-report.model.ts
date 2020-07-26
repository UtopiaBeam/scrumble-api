import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Sprint } from './sprint.model';
import { Ref } from '../types/ref';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class DailyReport extends Document {
    @Field(() => Int)
    @Prop({ required: true })
    remainingPoint: number;

    @Field(() => Sprint)
    @Prop({ type: Types.ObjectId, ref: 'Sprint' })
    sprint: Ref<Sprint>;
}

export const DailyReportSchema = SchemaFactory.createForClass(DailyReport);
