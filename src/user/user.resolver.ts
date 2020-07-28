import {
    Resolver,
    Query,
    Args,
    Mutation,
    Parent,
    ResolveField,
} from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserQueryArgs } from './dto/user.query';
import { UserService } from './user.service';
import { CreateUserMutation } from './dto/user.mutation';
import { MemberRole } from '../models/member-role.model';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly service: UserService) {}

    @Query(() => User)
    user(@Args() args: UserQueryArgs) {
        return this.service.findById(args.id);
    }

    @Mutation(() => User)
    createUser(@Args('data') user: CreateUserMutation) {
        return this.service.create(user);
    }

    @ResolveField(() => [MemberRole])
    projectRoles(@Parent() user: User) {
        return this.service.findProjectRoles(user.id);
    }
}
