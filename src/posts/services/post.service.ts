import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PrismaService } from '../../common/services/prisma.service';
import { PostDto } from '../dtos/request/post.dto';
import { PostResponseDto } from '../dtos/response/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: PostDto, userId: string): Promise<PostResponseDto> {
    const post = await this.prismaService.post.create({
      data: { title: input.title, userId },
    });

    return plainToClass(PostResponseDto, post);
  }

  async list(): Promise<PostResponseDto[]> {
    const posts = await this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return plainToInstance(PostResponseDto, posts);
  }
}
