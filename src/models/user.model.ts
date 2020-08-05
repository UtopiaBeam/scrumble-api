import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProjectRole, ProjectRoleSchema } from './project-role.model';

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, select: false })
    password: string;

    @Field()
    @Prop({ required: true })
    email: string;

    @Field(() => [ProjectRole])
    @Prop({ type: [ProjectRoleSchema], default: [] })
    projects: ProjectRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);
