import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { CreateUserMutation, EditUserMutation } from './dto/user.mutation';
import * as bcrypt from 'bcryptjs';
import { MemberRole } from '../models/member-role.model';
import { ProjectRole } from '../models/project-role.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

    findById(id: string) {
        return this.model
            .findById(id)
            .populate({ path: 'projects', populate: { path: 'project' } })
            .exec();
    }

    private findByIdWithPassword(id: string) {
        return this.model
            .findById(id)
            .select('+password')
            .exec();
    }

    private findByUsernameWithPassword(username: string) {
        return this.model
            .findOne({ username })
            .select('+password')
            .exec();
    }

    async create(userDTO: CreateUserMutation) {
        const user = new this.model(userDTO);
        user.password = await bcrypt.hash(userDTO.password, 10);
        return user.save();
    }

    async edit(
        id: string,
        { newPassword, password, ...userDTO }: EditUserMutation,
    ) {
        if (!(await this.validateById(id, password))) {
            throw new UnauthorizedException();
        }
        const user = await this.model.findByIdAndUpdate(id, userDTO);
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10);
        }
        return user.save();
    }

    private async validate(user: User, password: string) {
        if (await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateById(id: string, password: string) {
        const user = await this.findByIdWithPassword(id);
        return this.validate(user, password);
    }

    async validateByUsername(username: string, password: string) {
        const user = await this.findByUsernameWithPassword(username);
        return this.validate(user, password);
    }
}
