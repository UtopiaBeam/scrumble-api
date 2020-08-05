import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../models/project.model';
import { ProjectRole, ProjectRoleSchema } from '../models/project-role.model';
import { MemberRole, MemberRoleSchema } from '../models/member-role.model';
import { Label, LabelSchema } from '../models/label.model';
import { User, UserSchema } from '../models/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
            { name: ProjectRole.name, schema: ProjectRoleSchema },
            { name: MemberRole.name, schema: MemberRoleSchema },
            { name: Label.name, schema: LabelSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
