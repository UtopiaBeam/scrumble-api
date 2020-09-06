import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { EditUserMutation } from './dto/user.mutation';
import * as bcrypt from 'bcryptjs';
import { RegisterMutation } from '../auth/dto/auth.mutation';
import { Project } from '../models/project.model';
import { MemberRole } from '../models/member-role.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly model: Model<User>,
        @InjectModel(MemberRole.name)
        private readonly memberRoleModel: Model<MemberRole>,
    ) {}

    findById(id: string) {
        return this.model
            .findById(id)
            .populate({ path: 'projectRoles', populate: { path: 'project' } })
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

    async create(userDTO: RegisterMutation) {
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

    private async validate(user: User, password: string): Promise<User> {
        if (await bcrypt.compare(password, user.password)) {
            return user;
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

    async findProjects(id: string) {
        const projects = await this.memberRoleModel
            .find({ user: id })
            .populate('projectRoles')
            .exec();
        return projects.map(p => ({
            role: p.role,
            ...(p.project as Project),
        }));
    }
}
