import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EventResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly date: Date;

  @Expose()
  readonly startHour: Date;

  @Expose()
  readonly endHour: Date;

  @Expose()
  readonly ownerId: string;
}
