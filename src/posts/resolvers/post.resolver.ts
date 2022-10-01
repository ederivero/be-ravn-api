import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { UserDto } from '../../auth/dtos/responses/user.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { PostInput } from '../dtos/inputs/post.input';
import { PostResponseDto } from '../dtos/response/post.dto';
import { PostModel } from '../models/post.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostModel, { name: 'createPost' })
  async createPost(
    @CurrentUser() user,
    @Args('input') input: PostInput,
  ): Promise<PostResponseDto> {
    return this.postService.create(input, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [PostModel], { name: 'listPosts' })
  async listPost(): Promise<PostResponseDto[]> {
    return this.postService.list();
  }

  @ResolveField()
  async user(@Parent() post: PostResponseDto): Promise<UserDto> {
    return this.userService.findById(post.userId);
  }
}
