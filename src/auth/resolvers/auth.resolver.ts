import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { InputAuthCode } from '../dtos/inputs/code-auth.input';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, { name: 'authorizationUrlForLoginWithSlack' })
  async getAuthorizationUrlForLoginWithSlack() {
    return this.authService.getAuthorizationUrlForLoginWithSlack();
  }
  @Mutation(() => String, { name: 'login' })
  async login(@Args('input') input: InputAuthCode) {
    return this.authService.login(input.code);
  }
}
