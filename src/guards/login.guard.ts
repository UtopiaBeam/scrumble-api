import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class LoginGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const gqlContext = GqlExecutionContext.create(context);
        const req: Request = gqlContext.getContext().req;
        return !!req.user;
    }
}
