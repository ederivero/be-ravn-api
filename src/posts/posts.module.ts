import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { PostResolver } from './resolvers/post.resolver';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    CommonModule,
  ],
  providers: [PostResolver, PostService, UserService],
})
export class PostsModule {}
