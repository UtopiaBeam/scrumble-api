import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../models/project.model';
import { Label, LabelSchema } from '../models/label.model';
import { MemberRole, MemberRoleSchema } from '../models/member-role.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
            { name: Label.name, schema: LabelSchema },
            { name: MemberRole.name, schema: MemberRoleSchema },
        ]),
    ],
    providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
