import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import {
    CreateProjectMutation,
    EditProjectMutation,
} from './dto/project.mutation';
import { CurrentUser } from '../decorators/current-user';
import { ParseIntPipe } from '@nestjs/common';
import { Project } from '../entities/Project.entity';
import { User } from '../entities/User.entity';

@Resolver(() => Project)
export class ProjectResolver {
    constructor(private readonly service: ProjectService) {}

    @Query(() => Project)
    project(@Args('id', ParseIntPipe) id: number) {
        return this.service.findById(id);
    }

    @Mutation(() => Project)
    createProject(
        @CurrentUser() user: User,
        @Args('data') project: CreateProjectMutation,
    ) {
        return this.service.create(user, project);
    }

    @Mutation(() => Project)
    editProject(
        @Args('id', ParseIntPipe) id: number,
        @Args('data') project: EditProjectMutation,
    ) {
        return this.service.edit(id, project);
    }
}
