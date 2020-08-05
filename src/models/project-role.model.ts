import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Ref } from '../types/ref';
import { Project } from './project.model';
import { Role } from '../enums/role';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class ProjectRole extends Document {
    @Field()
    id: string;

    @Field(() => Project)
    @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
    project: Ref<Project>;

    @Field(() => Role)
    @Prop({ enum: Object.keys(Role), default: Role.Viewer })
    role: Role;
}

export const ProjectRoleSchema = SchemaFactory.createForClass(ProjectRole);
