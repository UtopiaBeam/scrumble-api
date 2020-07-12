import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Backlog } from './backlog.model';
import { Ref } from '../types/ref';

@Schema()
export class Epic extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  color: string;

  @Prop({ type: [Types.ObjectId], ref: 'Backlog', default: [] })
  backlogs: Ref<Backlog>[];
}

export const EpicSchema = SchemaFactory.createForClass(Epic);
