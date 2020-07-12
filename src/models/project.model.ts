import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { MemberRole } from './member-role.model';
import { Ref } from '../types/ref';
import { Label } from './label.model';

@Schema({ timestamps: true })
export class Project extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ type: [Types.ObjectId], ref: 'MemberRole', default: [] })
    memberRoles: Ref<MemberRole>[];

    @Prop({ type: [Types.ObjectId], ref: 'Label', default: [] })
    labels: Ref<Label>[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
