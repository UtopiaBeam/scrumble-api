import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectMutation {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;
}

@InputType()
export class EditProjectMutation {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;
}

@InputType()
export class AddProjectMembersMutation {
    @Field()
    userId: string;
}
