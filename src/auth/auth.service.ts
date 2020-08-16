import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    validateUser(username: string, password: string) {
        return this.userService.validateByUsername(username, password);
    }

    login(user: User) {
        const payload = { userId: user.id, username: user.username };
        return { token: this.jwtService.sign(payload) };
    }
}
