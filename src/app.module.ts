import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { EventsModule } from './events/events.module';
import configuration from './common/config/default.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
      playground: true,
      tracing: true,
      introspection: true,
      debug: true,
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards', 'filters'],
    }),
    AuthModule,
    PostsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
