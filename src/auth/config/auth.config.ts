import { registerAs } from '@nestjs/config';

export default registerAs('slack', () => ({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  redirectUri: process.env.SLACK_REDIRECT_URI,
  clientIdAdmin: process.env.SLACK_CLIENT_ID_ADMIN,
  clientSecretAdmin: process.env.SLACK_CLIENT_SECRET_ADMIN,
  signingSecretAdmin: process.env.SLACK_SIGNING_SECRET_ADMIN,
  redirectUriAdmin: process.env.SLACK_REDIRECT_URI_ADMIN,
  scope:
    process.env.SLACK_SCOPE ||
    'team%3Aread%2Cusers%3Aread.email%2Cusers%3Aread%2Cusers.profile%3Aread',
  appToken: process.env.SLACK_TOKEN,
}));
