import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEpicMutation {
    @Field()
    projectId: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    color: string;
}

@InputType()
export class EditEpicMutation {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    color?: string;
}
