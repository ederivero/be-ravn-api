import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  readonly id: string;

  @Field()
  readonly email: string;

  @Field()
  readonly userName: string;
  @Field()
  readonly name: string;

  @Field()
  readonly title: string;

  @Field({ nullable: true })
  readonly phone?: string;

  @Field()
  readonly avatarUrl: string;

  @Field()
  readonly country: string;

  @Field()
  readonly city: string;
}
