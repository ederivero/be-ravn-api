import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseClient, Issuer } from 'openid-client';
import { OpenIDConnectTokenResponse, WebClient } from '@slack/web-api';
import { PrismaService } from '../../common/services/prisma.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../dtos/responses/user.dto';
import { decode } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { AccessUserDto } from '../dtos/responses/access.dto';
@Injectable()
export class AuthService {
  private noTokenClient: WebClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {
    this.noTokenClient = new WebClient();
  }
  async getAuthorizationUrlForLoginWithSlack(admin: boolean): Promise<string> {
    const issuer = await Issuer.discover(
      'https://slack.com/.well-known/openid-configuration',
    );
    let client: BaseClient;
    if (admin) {
      client = new issuer.Client({
        client_id: this.configService.get<string>('slack.clientIdAdmin'),
        client_secret: this.configService.get<string>(
          'slack.clientSecretAdmin',
        ),
        redirect_uris: [
          this.configService.get<string>('slack.redirectUriAdmin'),
        ],
        response_types: ['code'],
      });
    } else {
      client = new issuer.Client({
        client_id: this.configService.get<string>('slack.clientId'),
        client_secret: this.configService.get<string>('slack.clientSecret'),
        redirect_uris: [this.configService.get<string>('slack.redirectUri')],
        response_types: ['code'],
      });
    }

    const authorizationUrl = client.authorizationUrl({
      scope: 'openid email profile',
    });

    return authorizationUrl;
  }

  async login(code: string, admin: boolean): Promise<AccessUserDto> {
    let result: OpenIDConnectTokenResponse;

    if (admin) {
      result = await this.noTokenClient.openid.connect.token({
        client_id: this.configService.get<string>('slack.clientIdAdmin'),
        client_secret: this.configService.get<string>(
          'slack.clientSecretAdmin',
        ),
        grant_type: 'authorization_code',
        code: code,
      });
    } else {
      result = await this.noTokenClient.openid.connect.token({
        client_id: this.configService.get<string>('slack.clientId'),
        client_secret: this.configService.get<string>('slack.clientSecret'),
        grant_type: 'authorization_code',
        code: code,
      });
    }

    const idUser = decode(result.id_token).sub as string;
    const { profile } = await this.getUserProfile(idUser);

    let user = await this.prismaService.user.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      const city = profile.fields['Xf03QWH9JSRF']?.value;
      const country = profile.fields['Xf03QB9TEX6J']?.value;

      user = await this.prismaService.user.create({
        data: {
          avatarUrl: profile.image_original,
          city,
          country,
          email: profile.email,
          userName: profile.display_name,
          name: profile.real_name,
          phone: profile.phone,
          title: profile.title,
        },
      });
    }
    const accessToken = await this.createToken(user, result.access_token);

    return plainToClass(AccessUserDto, { accessToken, user });
  }

  async getUserProfile(user: string) {
    const tokenWiredClient = new WebClient(
      this.configService.get('slack.appToken'),
    );
    const profile = await tokenWiredClient.users.profile.get({ user });

    return profile;
  }

  async createToken(user: UserDto, slackToken: string) {
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    await this.prismaService.auth.create({
      data: { slackToken, userId: user.id },
    });
    return accessToken;
  }
}
