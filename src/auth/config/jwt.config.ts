import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
}));
