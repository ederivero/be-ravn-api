import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Issuer } from 'openid-client';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  async getAuthorizationUrlForLoginWithSlack(): Promise<string> {
    const issuer = await Issuer.discover(
      'https://slack.com/.well-known/openid-configuration',
    );

    const client = new issuer.Client({
      client_id: this.configService.get<string>('slack.clientId'),
      client_secret: this.configService.get<string>('slack.clientSecret'),
      redirect_uris: [this.configService.get<string>('slack.redirectUri')], // redirect URL in the app’s OAuth and Permissions page
      response_types: ['code'],
    });

    const authorizationUrl = client.authorizationUrl({
      scope: 'openid email profile',
    });

    return authorizationUrl;
  }

  async login(code: string) {
    const result = await axios.post(
      'https://slack.com/api/openid.connect.token',
      new URLSearchParams({
        client_id: this.configService.get<string>('slack.clientId'),
        client_secret: this.configService.get<string>('slack.clientSecret'),
        grant_type: 'authorization_code',
        code,
      }),
    );
    console.log(result.data);
    return 'ok';
  }
}
