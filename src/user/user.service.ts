import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EditUserMutation } from './dto/user.mutation';
import * as bcrypt from 'bcryptjs';
import { RegisterMutation } from '../auth/dto/auth.mutation';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
    ) {}

    findById(id: number) {
        return this.repo.findOne(id);
    }

    private findByIdWithPassword(id: number) {
        return this.repo.findOne(id, { select: ['password'] });
    }

    private findByUsernameWithPassword(username: string) {
        return this.repo.findOne({ username }, { select: ['password'] });
    }

    async create(userDTO: RegisterMutation) {
        const user = this.repo.create(userDTO);
        user.password = await bcrypt.hash(userDTO.password, 10);
        return this.repo.save(user);
    }

    async edit(
        id: number,
        { newPassword, password, ...userDTO }: EditUserMutation,
    ) {
        if (!(await this.validateById(id, password))) {
            throw new UnauthorizedException();
        }
        const user = { ...(await this.repo.findOne(id)), ...userDTO };
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10);
        }
        return this.repo.save(user);
    }

    private async validate(user: User, password: string): Promise<User> {
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async validateById(id: number, password: string) {
        const user = await this.findByIdWithPassword(id);
        return this.validate(user, password);
    }

    async validateByUsername(username: string, password: string) {
        const user = await this.findByUsernameWithPassword(username);
        return this.validate(user, password);
    }
}
