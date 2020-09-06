import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../models/user.model';
import { Role } from '../../enums/role';

@ObjectType()
export class ProjectMember extends User {
    @Field(() => Role)
    role: Role;
}
