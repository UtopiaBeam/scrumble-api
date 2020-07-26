import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Ref } from '../types/ref';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Comment extends Document {
    @Field()
    @Prop({ required: true })
    text: string;

    @Field(() => Int)
    @Prop({ default: 0 })
    like: number;

    @Field(() => Int)
    @Prop({ default: 0 })
    unlike: number;

    @Field(() => User)
    @Prop({ type: Types.ObjectId, ref: 'User' })
    author: Ref<User>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
