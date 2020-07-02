import { Schema, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Ref } from '../types/ref';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  like: number;

  @Prop({ default: 0 })
  unlike: number;

  @Prop({ type: Types.ObjectId, ref: User.name })
  author: Ref<User>;
}
