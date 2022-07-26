import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundHandler } from 'src/utils/errorHandlers';
import { Id } from 'src/utils/types';
import { Favorites } from '../schemas/favorites.schema';

type favsFields = 'artists' | 'albums' | 'tracks';

@Injectable()
export class FavoritesService {
  id = 0;
  constructor(private prisma: PrismaService) {
    this.initFavs();
  }

  async get(): Promise<Favorites> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 0 },
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            artistId: true,
            year: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            artistId: true,
            albumId: true,
            duration: true,
          },
        },
      },
    });

    return favorites;
  }

  async add(id: Id, type: favsFields): Promise<{ id: Id }> {
    const customType = type.slice(0, -1);
    try {
      await this.prisma[customType].update({
        where: {
          id: id,
        },
        data: {
          favoritesId: 0,
        },
      });
      return { id };
    } catch (err) {
      throw new UnprocessableEntityException(
        `id - '${id}' not found in ${type}`,
      );
    }
  }

  async delete(id: Id, type: favsFields): Promise<{ id: Id }> {
    const customType = type.slice(0, -1);
    try {
      await this.prisma[customType].update({
        where: {
          id: id,
        },
        data: {
          favoritesId: null,
        },
      });
      return { id };
    } catch (err) {
      NotFoundHandler(customType, id);
    }
  }

  // inclass services

  private async initFavs() {
    try {
      await this.prisma.favorites.findUniqueOrThrow({
        where: { id: 0 },
      });
    } catch {
      await this.prisma.favorites.create({
        data: {
          id: null,
        },
      });
    }
  }
}
