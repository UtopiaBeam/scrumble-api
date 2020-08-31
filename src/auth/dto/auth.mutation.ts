import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginMutation {
    @Field()
    username: string;

    @Field()
    password: string;
}

@InputType()
export class RegisterMutation {
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;
}
