import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MemberRole } from './member-role.model';
import { Ref } from '../types/ref';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [Types.ObjectId], ref: MemberRole.name, default: [] })
  projectRoles: Ref<MemberRole>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
