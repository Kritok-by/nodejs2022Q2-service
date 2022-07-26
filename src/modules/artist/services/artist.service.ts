import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Artist } from '../schemas/artist.schema';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundHandler } from 'src/utils/errorHandlers';
import { Id } from 'src/utils/types';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: Id): Promise<Artist> {
    try {
      return await this.prisma.artist.findUniqueOrThrow({
        where: { id },
      });
    } catch {
      NotFoundHandler('Artist', id);
    }
  }

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: {
        ...createArtistDto,
        id: v4(),
      },
    });
  }

  async delete(id: Id): Promise<Artist> {
    try {
      return await this.prisma.artist.delete({
        where: { id },
      });
    } catch {
      NotFoundHandler('Artist', id);
    }
  }

  async update(id: Id, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    try {
      return await this.prisma.artist.update({
        where: {
          id: id,
        },
        data: { ...updateArtistDto },
      });
    } catch {
      NotFoundHandler('Artist', id);
    }
  }
}
