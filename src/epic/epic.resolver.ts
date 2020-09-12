import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { Backlog } from '../models/backlog.model';
import { Epic } from '../models/epic.model';
import { Project } from '../models/project.model';
import { CreateEpicMutation, EditEpicMutation } from './dto/epic.mutation';
import { EpicService } from './epic.service';

@Resolver(() => Epic)
export class EpicResolver {
    constructor(private readonly service: EpicService) {}

    @Query(() => Epic)
    epic(@Args('id') id: string) {
        return this.service.findById(id);
    }

    @Mutation(() => Epic)
    createEpic(@Args('data') data: CreateEpicMutation) {
        return this.service.create(data);
    }

    @Mutation(() => Epic)
    editEpic(@Args('id') id: string, @Args('data') data: EditEpicMutation) {
        return this.service.update(id, data);
    }

    @ResolveField(() => Project)
    project(@Parent() epic: Epic) {
        return this.service.findProject(epic.id);
    }

    @ResolveField(() => [Backlog])
    backlogs(@Parent() epic: Epic) {
        return this.service.findBacklogs(epic.id);
    }
}
