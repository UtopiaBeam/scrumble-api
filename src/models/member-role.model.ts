import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Ref } from '../types/ref';
import { Role } from '../enums/role';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class MemberRole extends Document {
    @Field()
    id: string;

    @Field(() => User)
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Ref<User>;

    @Field(() => Role)
    @Prop({ enum: Object.keys(Role), default: Role.Viewer })
    role: Role;
}

export const MemberRoleSchema = SchemaFactory.createForClass(MemberRole);
