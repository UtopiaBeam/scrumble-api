import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { List } from './list.model';
import { Ref } from '../types/ref';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Board extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field(() => [List])
    @Prop({ type: [Types.ObjectId], ref: 'List', default: [] })
    lists: Ref<List>[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
