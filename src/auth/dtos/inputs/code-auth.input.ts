import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputAuthCode {
  @Field()
  readonly code: string;
}
