import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/modules/album/services/album.service';
import { ArtistService } from 'src/modules/artist/services/artist.service';
import { TrackService } from 'src/modules/track/services/track.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Id } from 'src/utils/types';
import { Favorites } from '../schemas/favorites.schema';

type favsFields = 'artists' | 'albums' | 'tracks';

@Injectable()
export class FavoritesService {
  id = 0;
  constructor(
    private prisma: PrismaService,
    private artists: ArtistService,
    private albums: AlbumService,
    private tracks: TrackService,
  ) {
    this.initFavs();
  }

  private async initFavs() {
    try {
      await this.prisma.favorites.findFirstOrThrow({
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

  async get(): Promise<Favorites> {
    const favorites = await this.prisma.favorites.findFirst({
      where: { id: 0 },
      select: {
        id: false,
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    const resultArr = await Promise.all(
      Object.entries(favorites).map(async ([key, value]) => [
        key,
        await Promise.all(value.map((id: Id) => this[key].findOne(id))),
      ]),
    );

    return Object.fromEntries(resultArr);
  }

  async add(id: Id, type: favsFields): Promise<{ id: Id }> {
    try {
      await this[type].findOne(id);
    } catch {
      throw new UnprocessableEntityException(
        `id - '${id}' not found in ${type}`,
      );
    }

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
    const { [type]: oldData } = await this.prisma.favorites.findFirst({
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
}
