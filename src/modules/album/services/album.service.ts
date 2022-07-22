import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Album } from '../schemas/album.schema';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundHandler } from 'src/utils/errorHandlers';
import { Id } from 'src/utils/types';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: Id): Promise<Album> {
    try {
      return await this.prisma.album.findUniqueOrThrow({
        where: { id },
      });
    } catch {
      NotFoundHandler('Album', id);
    }
  }

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({
      data: {
        ...createAlbumDto,
        id: v4(),
      },
    });
  }

  async delete(id: Id): Promise<Album> {
    try {
      const res = await this.prisma.album.delete({
        where: { id },
      });

      await this.prisma.track.updateMany({
        where: {
          albumId: id,
        },
        data: {
          albumId: null,
        },
      });

      return res;
    } catch {
      NotFoundHandler('Album', id);
    }
  }

  async update(id: Id, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    try {
      return await this.prisma.album.update({
        where: {
          id: id,
        },
        data: { ...updateAlbumDto },
      });
    } catch {
      NotFoundHandler('Album', id);
    }
  }
}
