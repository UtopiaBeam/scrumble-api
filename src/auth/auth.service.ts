import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import { ConfigService } from '../config/config.service';
import { JwtToken } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(username: string, password: string): Promise<JwtToken> {
        const user: User = await this.userService.validateByUsername(
            username,
            password,
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { userId: user.id, username };
        return { token: this.jwtService.sign(payload) };
    }
}
