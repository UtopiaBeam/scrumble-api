import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Backlog } from './backlog.model';
import { Ref } from '../types/ref';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Epic extends Document {
    @Field()
    @Prop({ required: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field()
    @Prop({ required: true })
    color: string;

    @Field(() => [Backlog])
    @Prop({ type: [Types.ObjectId], ref: 'Backlog', default: [] })
    backlogs: Ref<Backlog>[];
}

export const EpicSchema = SchemaFactory.createForClass(Epic);
