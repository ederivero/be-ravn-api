import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { InputAuthCode } from '../dtos/inputs/code-auth.input';
import { AccessModel } from '../models/access.model';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, { name: 'authorizationUrlForLoginWithSlack' })
  async getAuthorizationUrlForLoginWithSlack() {
    return this.authService.getAuthorizationUrlForLoginWithSlack();
  }

  @Mutation(() => AccessModel, { name: 'login' })
  async login(@Args('input') input: InputAuthCode) {
    return this.authService.login(input.code);
  }

  //   @UseGuards(GqlAuthGuard)
  //   @Query(() => String, { name: 'profile' })
  //   async profile(@CurrentUser() user) {
  //     console.log(user);
  //     return '';
  //   }
}
