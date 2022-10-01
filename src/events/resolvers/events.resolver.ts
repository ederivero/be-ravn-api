import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserDto } from 'src/auth/dtos/responses/User.dto';
import { UserService } from 'src/posts/services/user.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { EventInput } from '../dtos/input/event.input';
import { EventResponseDto } from '../dtos/response/event.dto';
import { EventModel } from '../models/event.model';
import { EventService } from '../services/events.service';

@Resolver(() => EventModel)
@UseGuards(GqlAuthGuard)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => EventModel, { name: 'createEvent' })
  async createEvent(@CurrentUser() user, @Args('input') input: EventInput) {
    return this.eventService.create(input, user.id);
  }

  @Query(() => [EventModel], { name: 'listEvents' })
  async listEvents() {
    return this.eventService.list();
  }

  @ResolveField()
  async owner(@Parent() event: EventResponseDto): Promise<UserDto> {
    return this.userService.findById(event.ownerId);
  }
}
