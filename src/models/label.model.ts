import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Label extends Document {
    @Field()
    @Prop({ required: true })
    name: string;

    @Field()
    @Prop({ required: true })
    color: string;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
