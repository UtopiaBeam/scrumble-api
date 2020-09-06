import { Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role';
import { Ref } from '../types/ref';
import { User } from './user.model';
import { Project } from './project.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class MemberRole extends Document {
    @Field(() => Role)
    @Prop({ enum: Object.keys(Role), default: Role.Viewer })
    role: Role;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Ref<User>;

    @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
    project: Ref<Project>;
}

export const MemberRoleSchema = SchemaFactory.createForClass(MemberRole);
