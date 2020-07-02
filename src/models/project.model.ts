import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ProjectMember } from './project-member.model';
import { Ref } from '../types/ref';
import { Label } from './label.model';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: ProjectMember.name, default: [] })
  memberRoles: Ref<ProjectMember>[];

  @Prop({ type: Types.ObjectId, ref: Label.name })
  labels: Ref<Label>[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
