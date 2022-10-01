import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PrismaService } from '../../common/services/prisma.service';
import { EventDto } from '../dtos/request/event.dto';
import { EventResponseDto } from '../dtos/response/event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: EventDto, userId): Promise<EventResponseDto> {
    const [startHour, startMinute] = input.startHour.split(':');
    const [endHour, endMinute] = input.endHour.split(':');
    const event = await this.prismaService.event.create({
      data: {
        ownerId: userId,
        ...input,
        startHour: new Date(2000, 1, 1, +startHour, +startMinute),
        endHour: new Date(2000, 1, 1, +endHour, +endMinute),
      },
    });

    return plainToClass(EventResponseDto, event);
  }

  async list() {
    const events = await this.prismaService.event.findMany({
      orderBy: { date: 'desc' },
    });
    return plainToInstance(EventResponseDto, events);
  }
}
