import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostInput {
  @Field()
  readonly title: string;
}
