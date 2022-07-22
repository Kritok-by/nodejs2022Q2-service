import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import DataBase, { Id } from 'src/db/DataBase';
import { Artist } from '../schemas/artist.schema';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Track } from 'src/modules/track/schemas/track.schema';
import { Album } from 'src/modules/album/schemas/album.schema';

@Injectable()
export class ArtistService {
  findOne(id: Id): Promise<Artist> {
    return DataBase.getById(id, 'artists');
  }

  findAll(): Promise<Artist[]> {
    return DataBase.getAll('artists');
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newItem: Artist = {
      ...createArtistDto,
      id: v4(),
    };
    DataBase.createItem(newItem, 'artists');
    return newItem;
  }

  async delete(id: Id): Promise<Artist> {
    const item = DataBase.deleteItem(id, 'artists');
    const tracks = DataBase.getAll('tracks');
    const albums = DataBase.getAll('albums');
    const favorites = DataBase.getAll('favorites');

    tracks.forEach((track: Track) => {
      if (track?.artistId === id) {
        DataBase.putItem({ ...track, artistId: null }, 'tracks');
      }
    });

    albums.forEach((album: Album) => {
      if (album?.artistId === id) {
        DataBase.putItem({ ...album, artistId: null }, 'albums');
      }
    });

    favorites.artists = favorites.artists.filter(
      (artistId: Id) => id !== artistId,
    );

    DataBase.updateFavorites(favorites);

    return item;
  }

  async update(id: Id, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const oldItem = DataBase.getById(id, 'artists');

    const newItem = {
      ...oldItem,
      ...updateArtistDto,
    };

    DataBase.putItem(newItem, 'artists');

    return newItem;
  }
}
