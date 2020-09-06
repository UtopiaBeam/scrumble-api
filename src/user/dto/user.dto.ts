import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../../enums/role';
import { Project } from '../../models/project.model';

@ObjectType()
export class UserProject extends Project {
    @Field(() => Role)
    role: Role;
}