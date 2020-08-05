import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../models/project.model';
import { Model } from 'mongoose';
import {
    CreateProjectMutation,
    EditProjectMutation,
} from './dto/project.mutation';
import { Label } from '../models/label.model';
import { MemberRole } from '../models/member-role.model';
import { ProjectRole } from '../models/project-role.model';
import { User } from '../models/user.model';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private readonly model: Model<Project>,
        @InjectModel(MemberRole.name)
        private readonly memberRoleModel: Model<MemberRole>,
        @InjectModel(ProjectRole.name)
        private readonly projectModel: Model<ProjectRole>,
        @InjectModel(Label.name) private readonly labelModel: Model<Label>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    findById(id: string): Promise<Project> {
        return this.model.findById(id).exec();
    }

    create(projectDTO: CreateProjectMutation) {
        const project = new this.model(projectDTO);
        project.labels = [
            new this.labelModel({ name: 'backend', color: 'orange' }),
        ];
        return project.save();
    }

    edit(id: string, projectDTO: EditProjectMutation) {
        return this.model.findByIdAndUpdate(id, projectDTO).exec();
    }

    async addMember(id: string, userId: string): Promise<Project> {
        const memberRole = new this.memberRoleModel({ user: userId });
        const projectRole = new this.projectModel({ project: id });
        const session = await this.model.db.startSession();
        let project: Project;
        await session.withTransaction(async () => {
            const user = await this.userModel
                .findByIdAndUpdate(
                    userId,
                    { $push: { projects: projectRole } },
                    { new: true, session },
                )
                .exec();
            if (!user) {
                throw new NotFoundException('User not found');
            }
            project = await this.model
                .findByIdAndUpdate(
                    id,
                    { $push: { members: memberRole } },
                    { new: true, session },
                )
                .populate({ path: 'members', populate: { path: 'user' } })
                .exec();
            if (!project) {
                throw new NotFoundException('Project not found');
            }
        });
        session.endSession();
        return project;
    }
}
