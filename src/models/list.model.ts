import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Backlog } from './backlog.model';
import { Ref } from '../types/ref';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class List extends Document {
    @Field()
    @Prop({ required: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field(() => Boolean)
    @Prop({ default: false })
    isDone: boolean;

    @Field(() => [Backlog])
    @Prop({ type: [Types.ObjectId], ref: Backlog.name, default: [] })
    cards: Ref<Backlog>[];
}

export const ListSchema = SchemaFactory.createForClass(List);
