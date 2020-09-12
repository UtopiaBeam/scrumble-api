import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Ref } from '../types/ref';
import { Project } from './project.model';

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, select: false })
    password: string;

    @Field()
    @Prop({ required: true })
    email: string;

    @Prop({ type: [Types.ObjectId], ref: 'MemberRole' })
    projectRoles: Ref<Project>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
