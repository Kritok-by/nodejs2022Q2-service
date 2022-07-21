import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
        id: false,
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    const resultArr = await Promise.all(
      Object.entries(favorites).map(
        async ([key, value]: [favsFields, Id[]]) => [
          key,
          await Promise.all(value.map((id: Id) => this.getTypeById(id, key))),
        ],
      ),
    );

    return Object.fromEntries(resultArr);
  }

  async add(id: Id, type: favsFields): Promise<{ id: Id }> {
    await this.getTypeById(id, type);
    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        [type]: {
          push: id,
        },
      },
    });

    return { id };
  }

  async delete(id: Id, type: favsFields): Promise<{ id: Id }> {
    const { [type]: oldData } = await this.prisma.favorites.findUniqueOrThrow({
      where: { id: 0 },
    });

    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        [type]: oldData.filter((typeId) => typeId !== id),
      },
    });

    return { id };
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
          id: 0,
          artists: [],
          albums: [],
          tracks: [],
        },
      });
    }
  }

  private async getTypeById(id: Id, type: favsFields) {
    const customType = type.slice(0, -1);

    try {
      return await this.prisma[customType].findUniqueOrThrow({
        where: { id },
      });
    } catch {
      throw new UnprocessableEntityException(
        `id - '${id}' not found in ${type}`,
      );
    }
  }
}
