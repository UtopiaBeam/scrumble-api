import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserMutation {
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;
}
