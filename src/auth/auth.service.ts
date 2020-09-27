import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './dto/auth.dto';
import { RegisterMutation } from './dto/auth.mutation';
import { User } from '../entities/User.entity';

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

    async register(userDTO: RegisterMutation) {
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
