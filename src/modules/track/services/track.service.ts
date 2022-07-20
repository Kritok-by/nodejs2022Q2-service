import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Track } from '../schemas/track.schema';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundHandler } from 'src/utils/errorHandlers';
import { Id } from 'src/utils/types';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: Id): Promise<Track> {
    try {
      return await this.prisma.track.findFirst({
        where: { id },
      });
    } catch {
      NotFoundHandler('Track', id);
    }
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({
      data: {
        ...createTrackDto,
        id: v4(),
      },
    });
  }

  async delete(id: Id): Promise<Track> {
    try {
      const res = await this.prisma.track.delete({
        where: { id },
      });

      await this.prisma.track.updateMany({
        where: {
          artistId: id,
        },
        data: {
          artistId: null,
        },
      });

      await this.prisma.album.updateMany({
        where: {
          artistId: id,
        },
        data: {
          artistId: null,
        },
      });

      /// favorites update

      return res;
    } catch {
      NotFoundHandler('Track', id);
    }
  }

  async update(id: Id, updateTrackDto: UpdateTrackDto): Promise<Track> {
    try {
      return await this.prisma.track.update({
        where: {
          id: id,
        },
        data: { ...updateTrackDto },
      });
    } catch {
      NotFoundHandler('Artist', id);
    }
  }
}
