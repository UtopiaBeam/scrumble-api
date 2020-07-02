import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Backlog } from './backlog.model';
import { Ref } from '../types/ref';

@Schema()
export class List extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({ type: [Types.ObjectId], ref: Backlog.name, default: [] })
  cards: Ref<Backlog>[];
}

export const ListSchema = SchemaFactory.createForClass(List);
