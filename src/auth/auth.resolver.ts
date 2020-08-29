import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginMutation, RegisterMutation } from './dto/auth.mutation';
import { JwtToken } from './dto/auth.dto';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly service: AuthService) {}

    @Mutation(() => JwtToken)
    login(@Args('data') credential: LoginMutation) {
        return this.service.login(credential.username, credential.password);
    }

    @Mutation(() => JwtToken)
    register(@Args('data') registerDTO: RegisterMutation) {
        return this.service.register(registerDTO);
    }
}
