import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.jwtSecret,
                signOptions: { expiresIn: config.jwtExpire },
            }),
        }),
    ],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
