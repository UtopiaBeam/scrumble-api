import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class JwtToken {
    @Field()
    token: string;
}
