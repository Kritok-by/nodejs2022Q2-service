import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import DataBase, { Id } from 'src/db/DataBase';
import { Album } from '../schemas/album.schema';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Track } from 'src/modules/track/schemas/track.schema';

@Injectable()
export class AlbumService {
  findOne(id: Id): Promise<Album> {
    return DataBase.getById(id, 'albums');
  }

  findAll(): Promise<Album[]> {
    return DataBase.getAll('albums');
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newItem: Album = {
      ...createAlbumDto,
      id: v4(),
    };
    DataBase.createItem(newItem, 'albums');
    return newItem;
  }

  async delete(id: Id): Promise<Album> {
    const item = DataBase.deleteItem(id, 'albums');
    const tracks = DataBase.getAll('tracks');
    const favorites = DataBase.getAll('favorites');

    tracks.forEach((track: Track) => {
      if (track?.albumId === id) {
        DataBase.putItem({ ...track, albumId: null }, 'tracks');
      }
    });

    favorites.albums = favorites.albums.filter((albumId: Id) => id !== albumId);
    DataBase.updateFavorites(favorites);

    return item;
  }

  async update(id: Id, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const oldItem = DataBase.getById(id, 'albums');

    const newItem = {
      ...oldItem,
      ...updateAlbumDto,
    };

    DataBase.putItem(newItem, 'albums');

    return newItem;
  }
}
