import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { MemberRole } from './member-role.model';
import { Ref } from '../types/ref';
import { Label } from './label.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Project extends Document {
    @Field()
    @Prop({ required: true })
    name: string;

    @Field({ nullable: true })
    @Prop()
    description?: string;

    @Field(() => [MemberRole])
    @Prop({ type: [Types.ObjectId], ref: 'MemberRole', default: [] })
    memberRoles: Ref<MemberRole>[];

    @Field(() => [Label])
    @Prop({ type: [Types.ObjectId], ref: 'Label', default: [] })
    labels: Ref<Label>[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
