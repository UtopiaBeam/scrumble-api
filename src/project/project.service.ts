import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../models/project.model';
import { Model, Types } from 'mongoose';
import {
    CreateProjectMutation,
    EditProjectMutation,
    AddProjectMemberMutation,
} from './dto/project.mutation';
import { User } from '../models/user.model';
import { Role } from '../enums/role';
import { MemberRole } from '../models/member-role.model';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private readonly model: Model<Project>,
        @InjectModel(MemberRole.name)
        private readonly memberRoleModel: Model<MemberRole>,
    ) {}

    findById(id: string): Promise<Project> {
        return this.model
            .findById(id)
            .populate({ path: 'memberRoles', populate: { path: 'user' } })
            .exec();
    }

    async create(user: User, projectDTO: CreateProjectMutation) {
        const project = new this.model(projectDTO);
        await this.addMember(project.id, { userId: user.id, role: Role.Admin });
        return project.save();
    }

    edit(id: string, projectDTO: EditProjectMutation) {
        return this.model.findByIdAndUpdate(id, projectDTO).exec();
    }

    async findMembers(id: string) {
        const members = await this.memberRoleModel
            .find({ project: Types.ObjectId(id) })
            .populate('user')
            .exec();
        return members.map(m => ({
            role: m.role,
            id: m.id,
            ...(m.toObject().user as User),
        }));
    }

    addMember(id: string, memberDTO: AddProjectMemberMutation) {
        const projectMember = new this.memberRoleModel({
            user: Types.ObjectId(memberDTO.userId),
            project: Types.ObjectId(id),
            role: memberDTO.role,
        });
        return projectMember.save();
    }
}
