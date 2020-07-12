import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Comment } from './comment.model';
import { Sprint } from './sprint.model';
import { Ref } from '../types/ref';
import { User } from './user.model';

@Schema({ timestamps: true })
export class Retrospective extends Document {
  @Prop({ default: [] })
  wentWell: Comment[];

  @Prop({ default: [] })
  toImprove: Comment[];

  @Prop({ default: [] })
  actions: Comment[];

  @Prop({ type: Types.ObjectId, ref: 'Sprint', required: true })
  sprint: Ref<Sprint>;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  participants: Ref<User>[];
}

export const RetrospectiveSchema = SchemaFactory.createForClass(Retrospective);
