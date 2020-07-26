import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MemberRole } from './member-role.model';
import { Ref } from '../types/ref';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
    @Field()
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, select: false })
    password: string;

    @Field()
    @Prop({ required: true })
    email: string;

    @Field(() => [MemberRole])
    @Prop({ type: [Types.ObjectId], ref: 'MemberRole', default: [] })
    projectRoles: Ref<MemberRole>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
