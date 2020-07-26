import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserQueryArgs {
    @Field()
    id: string;
}
