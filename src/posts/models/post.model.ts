import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/auth/models/user.model';

@ObjectType()
export class PostModel {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly title: string;

  @Field(() => GraphQLISODateTime)
  readonly createdAt: Date;

  @Field(() => UserModel)
  readonly user: UserModel;
}
