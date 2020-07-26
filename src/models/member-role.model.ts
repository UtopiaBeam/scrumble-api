import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Ref } from '../types/ref';
import { Project } from './project.model';
import { Role } from '../enums/role';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
@Schema()
export class MemberRole extends Document {
    @Field(() => User)
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Ref<User>;

    @Field(() => Project)
    @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
    project: Ref<Project>;

    @Field(() => Role)
    @Prop({ enum: Object.keys(Role), default: Role.Viewer })
    role: Role;
}

export const MemberRoleSchema = SchemaFactory.createForClass(MemberRole);
