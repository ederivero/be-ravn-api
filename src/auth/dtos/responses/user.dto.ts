import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly userName: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly phone?: string;

  @Expose()
  readonly avatarUrl: string;

  @Expose()
  readonly country: string;

  @Expose()
  readonly city: string;
}
