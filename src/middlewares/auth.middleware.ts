import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization.split('Bearer ')[1];
            const payload = this.authService.verifyToken(token);
            req.user = await this.userService.findById(payload.userId);
        } catch {
            req.user = null;
        }
        next();
    }
}
