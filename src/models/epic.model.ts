import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Backlog } from './backlog.model';
import { Ref } from '../types/ref';
import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from './project.model';

@ObjectType()
@Schema()
export class Epic extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field()
    @Prop({ required: true })
    color: string;

    @Prop({ type: Types.ObjectId, ref: 'Project' })
    project: Ref<Project>;

    @Prop({ type: [Types.ObjectId], ref: 'Backlog' })
    backlogs: Ref<Backlog>[];
}

export const EpicSchema = SchemaFactory.createForClass(Epic);
