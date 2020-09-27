import { Injectable } from '@nestjs/common';
import {
    CreateProjectMutation,
    EditProjectMutation,
    AddProjectMemberMutation,
} from './dto/project.mutation';
import { Role } from '../enums/role';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/Project.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private readonly repo: Repository<Project>,
    ) {}

    findById(id: number): Promise<Project> {
        return this.repo.findOne(id);
    }

    async create(user: User, projectDTO: CreateProjectMutation) {
        const project = this.repo.create(projectDTO);
        return this.repo.save(project);
    }

    async edit(id: number, projectDTO: EditProjectMutation) {
        const project = { ...(await this.repo.findOne(id)), ...projectDTO };
        return this.repo.save(project);
    }
}
