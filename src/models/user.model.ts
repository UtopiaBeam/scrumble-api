import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProjectMember } from './project-member.model';
import { Ref } from '../types/ref';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [Types.ObjectId], ref: ProjectMember.name, default: [] })
  projectRoles: Ref<ProjectMember>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
