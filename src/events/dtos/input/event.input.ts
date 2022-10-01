import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventInput {
  @Field()
  readonly title: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly startHour: string;

  @Field()
  readonly endHour: string;
}
