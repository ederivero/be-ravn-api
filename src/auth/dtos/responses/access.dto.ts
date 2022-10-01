import { Exclude, Expose } from 'class-transformer';
import { UserDto } from './user.dto';

@Exclude()
export class AccessUserDto {
  @Expose()
  readonly accessToken: string;

  @Expose()
  readonly user: UserDto;
}
