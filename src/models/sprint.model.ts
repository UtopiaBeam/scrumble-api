import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Board } from './board.model';
import { Ref } from '../types/ref';
import { Epic } from './epic.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Sprint extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field(() => Date)
    @Prop({ required: true })
    startDate: Date;

    @Field(() => Date)
    @Prop({ required: true })
    endDate: Date;

    @Field(() => [Board])
    @Prop({ type: [Types.ObjectId], ref: 'Board', default: [] })
    boards: Ref<Board>[];

    @Field(() => [Epic])
    @Prop({ type: [Types.ObjectId], ref: 'Epic', default: [] })
    epics: Ref<Epic>[];
}

export const SprintSchema = SchemaFactory.createForClass(Sprint);
