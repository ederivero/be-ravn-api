import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../posts/services/user.service';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { EventResolver } from './resolvers/events.resolver';
import { EventService } from './services/events.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    CommonModule,
  ],
  providers: [EventResolver, EventService, UserService],
})
export class EventsModule {}
