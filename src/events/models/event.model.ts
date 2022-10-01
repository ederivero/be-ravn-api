import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/auth/models/user.model';

@ObjectType()
export class EventModel {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly title: string;

  @Field(() => GraphQLISODateTime)
  readonly date: Date;

  @Field(() => GraphQLISODateTime)
  readonly startHour: Date;

  @Field(() => GraphQLISODateTime)
  readonly endHour: Date;

  @Field(() => UserModel)
  readonly owner: UserModel;
}
