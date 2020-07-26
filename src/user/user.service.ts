import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { CreateUserMutation } from './dto/user.mutation';
import * as bcrypt from 'bcryptjs';
import { MemberRole } from '../models/member-role.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly model: Model<User>,
        @InjectModel(MemberRole.name)
        private readonly memberRoleModel: Model<MemberRole>,
    ) {}

    findById(id: string) {
        return this.model.findById(id).exec();
    }

    findByUsernameWithPassword(username: string) {
        return this.model
            .findOne({ username })
            .select('+password')
            .exec();
    }

    async create(userDTO: CreateUserMutation) {
        const password = await bcrypt.hash(userDTO.password, 10);
        const user = new this.model(userDTO);
        user.password = password;
        return user.save();
    }

    findProjectRoles(id: string): Promise<MemberRole[]> {
        return this.memberRoleModel.find({ user: id }).exec();
    }
}
