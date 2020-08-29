import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import { JwtToken } from './dto/auth.dto';
import { RegisterMutation } from './dto/auth.mutation';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(username: string, password: string): Promise<JwtToken> {
        const user = await this.userService.validateByUsername(
            username,
            password,
        );
        return this.signToken(user);
    }

    async register({ confirmPassword, ...userDTO }: RegisterMutation) {
        if (confirmPassword !== userDTO.password) {
            throw new BadRequestException('Passwords are not matched');
        }
        const user = await this.userService.create(userDTO);
        return this.signToken(user);
    }

    private signToken(user: User): JwtToken {
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { userId: user.id, username: user.username };
        return { token: this.jwtService.sign(payload) };
    }

    verifyToken(token: string) {
        return this.jwtService.verify(token);
    }
}
