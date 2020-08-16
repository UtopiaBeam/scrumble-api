import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.secret,
                signOptions: { expiresIn: '60s' },
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
