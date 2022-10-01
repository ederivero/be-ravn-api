import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType()
export class AccessModel {
  @Field()
  readonly accessToken: string;

  @Field(() => UserModel)
  readonly user: UserModel;
}
