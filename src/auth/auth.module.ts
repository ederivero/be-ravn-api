import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
