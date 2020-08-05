import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Priority } from '../enums/priority';
import { Types, Document } from 'mongoose';
import { Ref } from '../types/ref';
import { User } from './user.model';
import { Epic } from './epic.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Backlog extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field({ nullable: true })
    @Prop()
    point?: number;

    @Field(() => Priority, { nullable: true })
    @Prop({ enum: Object.keys(Priority) })
    priority?: Priority;

    @Field(() => [Backlog])
    @Prop({ type: [Types.ObjectId], ref: 'Backlog', default: [] })
    backlogs: Ref<Backlog>[];

    @Field(() => User, { nullable: true })
    @Prop({ type: Types.ObjectId, ref: 'User' })
    assignee?: Ref<User>;

    @Field(() => Epic)
    @Prop({ type: Types.ObjectId, ref: 'Epic', required: true })
    epic: Ref<Epic>;
}

export const BacklogSchema = SchemaFactory.createForClass(Backlog);
