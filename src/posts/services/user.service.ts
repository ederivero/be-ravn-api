import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../../auth/dtos/responses/User.dto';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
    return plainToClass(UserDto, user);
  }
}
