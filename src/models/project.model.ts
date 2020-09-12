import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Ref } from '../types/ref';
import { Label, LabelSchema } from './label.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Epic } from './epic.model';
import { Board } from './board.model';
import { MemberRole } from './member-role.model';

@ObjectType()
@Schema()
export class Project extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true, unique: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field(() => [Epic])
    @Prop({ type: [Types.ObjectId], ref: 'Epic' })
    epics: Ref<Epic>[];

    @Field(() => [Board])
    @Prop({ type: [Types.ObjectId], ref: 'Board' })
    boards: Ref<Board>[];

    @Prop({ type: [Types.ObjectId], ref: 'MemberRole' })
    memberRoles: Ref<MemberRole>[];

    @Field(() => [Label])
    @Prop({ type: [LabelSchema], default: [] })
    labels: Label[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
