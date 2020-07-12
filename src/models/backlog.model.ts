import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Priority } from '../enums/priority';
import { Types, Document } from 'mongoose';
import { Ref } from '../types/ref';
import { User } from './user.model';
import { Epic } from './epic.model';

@Schema({ timestamps: true })
export class Backlog extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  point?: number;

  @Prop({ enum: Priority })
  priority?: Priority;

  @Prop({ type: [Types.ObjectId], ref: 'Backlog', default: [] })
  backlogs: Ref<Backlog>[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignee?: Ref<User>;

  @Prop({ type: Types.ObjectId, ref: 'Epic', required: true })
  epic: Ref<Epic>;
}

export const BacklogSchema = SchemaFactory.createForClass(Backlog);
