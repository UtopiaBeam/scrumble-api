import {
    Resolver,
    Query,
    Args,
    Mutation,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserQueryArgs } from './dto/user.query';
import { UserService } from './user.service';
import { EditUserMutation } from './dto/user.mutation';
import { CurrentUser } from '../decorators/current-user';
import { UserProject } from './dto/user.dto';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly service: UserService) {}

    @Query(() => User)
    user(@Args() args: UserQueryArgs) {
        return this.service.findById(args.id);
    }

    @Query(() => User)
    me(@CurrentUser() user: User) {
        return this.service.findById(user.id);
    }

    @Mutation(() => User)
    editUser(@Args('id') id: string, @Args('data') user: EditUserMutation) {
        return this.service.edit(id, user);
    }

    @ResolveField(() => [UserProject])
    projects(@Parent() user: User) {
        return this.service.findProjects(user.id);
    }
}
