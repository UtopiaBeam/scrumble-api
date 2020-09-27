import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { EditUserMutation } from './dto/user.mutation';
import { CurrentUser } from '../decorators/current-user';
import { ParseIntPipe } from '@nestjs/common';
import { User } from '../entities/User.entity';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly service: UserService) {}

    @Query(() => User)
    user(@Args('id', ParseIntPipe) id: number) {
        return this.service.findById(id);
    }

    @Query(() => User)
    me(@CurrentUser() user: User) {
        return this.service.findById(user.id);
    }

    @Mutation(() => User)
    editUser(@Args('id', ParseIntPipe) id: number, @Args('data') user: EditUserMutation) {
        return this.service.edit(id, user);
    }
}
