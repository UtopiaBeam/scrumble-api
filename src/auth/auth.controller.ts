import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { Request } from 'express';
import { User } from '../models/user.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Req() req: Request) {
        return this.service.login(req.user as User);
    }
}
