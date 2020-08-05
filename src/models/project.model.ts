import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { MemberRole } from './member-role.model';
import { Ref } from '../types/ref';
import { Label, LabelSchema } from './label.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Project extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true, unique: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field(() => [MemberRole])
    @Prop({ type: [Types.ObjectId], ref: 'MemberRole', default: [] })
    memberRoles: Ref<MemberRole>[];

    @Field(() => [Label])
    @Prop({ type: [LabelSchema], default: [] })
    labels: Label[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
