import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<number>('jwt.accessTokenSecret'),
    });
  }

  async validate(payload: {
    sub: string;
    teamId: string;
    iat: number;
    exp: number;
  }) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub as string },
    });

    return user;
  }
}
