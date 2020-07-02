import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Ref } from '../types/ref';
import { Project } from './project.model';
import { Role } from '../enums/role';

@Schema()
export class ProjectMember extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Ref<User>;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Ref<Project>;

  @Prop({ enum: Role, default: Role.Viewer })
  role: Role;
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);
