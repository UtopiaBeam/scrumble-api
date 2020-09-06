import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../../enums/role';

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
export class AddProjectMemberMutation {
    @Field()
    userId: string;

    @Field(() => Role, { nullable: true })
    role?: Role;
}
