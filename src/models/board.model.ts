import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { List } from './list.model';
import { Ref } from '../types/ref';

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: [Types.ObjectId], ref: List.name, default: [] })
  lists: Ref<List>[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
