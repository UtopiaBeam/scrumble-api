import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';
import {
    CreateProjectMutation,
    EditProjectMutation,
    AddProjectMembersMutation,
} from './dto/project.mutation';

@Resolver(() => Project)
export class ProjectResolver {
    constructor(private readonly service: ProjectService) {}

    @Query(() => Project)
    project(@Args('id') id: string) {
        return this.service.findById(id);
    }

    @Mutation(() => Project)
    createProject(@Args('data') project: CreateProjectMutation) {
        return this.service.create(project);
    }

    @Mutation(() => Project)
    editProject(
        @Args('id') id: string,
        @Args('data') project: EditProjectMutation,
    ) {
        return this.service.edit(id, project);
    }

    @Mutation(() => Project)
    addProjectMember(
        @Args('id') id: string,
        @Args('data') { userId }: AddProjectMembersMutation,
    ) {
        return this.service.addMember(id, userId);
    }
}
