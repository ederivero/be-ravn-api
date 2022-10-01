import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
  handleRequest<T>(
    err: Record<string, unknown> | null,
    user: T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info: Error | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContextHost,
  ) {
    if (err || !user) {
      throw new UnauthorizedException('error');
    }

    return user;
  }
}
