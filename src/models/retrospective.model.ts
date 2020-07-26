import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Comment } from './comment.model';
import { Sprint } from './sprint.model';
import { Ref } from '../types/ref';
import { User } from './user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Retrospective extends Document {
    @Field(() => [Comment])
    @Prop({ default: [] })
    wentWell: Comment[];

    @Field(() => [Comment])
    @Prop({ default: [] })
    toImprove: Comment[];

    @Field(() => [Comment])
    @Prop({ default: [] })
    actions: Comment[];

    @Field(() => Sprint)
    @Prop({ type: Types.ObjectId, ref: 'Sprint', required: true })
    sprint: Ref<Sprint>;

    @Field(() => [User])
    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
    participants: Ref<User>[];
}

export const RetrospectiveSchema = SchemaFactory.createForClass(Retrospective);
