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

@InputType()
export class EditUserMutation {
    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    newPassword?: string;

    @Field({ nullable: true })
    email?: string;

    @Field()
    password: string;
}
