import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly userId: string;
}
