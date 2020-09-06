import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';
import {
    CreateProjectMutation,
    EditProjectMutation,
    AddProjectMemberMutation,
} from './dto/project.mutation';
import { CurrentUser } from '../decorators/current-user';
import { User } from '../models/user.model';
import { ProjectMember } from './dto/project.dto';
import { MemberRole } from '../models/member-role.model';

@Resolver(() => Project)
export class ProjectResolver {
    constructor(private readonly service: ProjectService) {}

    @Query(() => Project)
    project(@Args('id') id: string) {
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
        @Args('id') id: string,
        @Args('data') project: EditProjectMutation,
    ) {
        return this.service.edit(id, project);
    }

    @Mutation(() => ProjectMember)
    addProjectMember(
        @Args('id') id: string,
        @Args('data') data: AddProjectMemberMutation,
    ): Promise<MemberRole> {
        return this.service.addMember(id, data);
    }

    @ResolveField(() => [ProjectMember])
    members(@Parent() project: Project) {
        return this.service.findMembers(project.id);
    }
}
