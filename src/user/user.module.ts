import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.model';
import { UserResolver } from './user.resolver';
import { MemberRole, MemberRoleSchema } from '../models/member-role.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: MemberRole.name, schema: MemberRoleSchema },
        ]),
    ],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}
