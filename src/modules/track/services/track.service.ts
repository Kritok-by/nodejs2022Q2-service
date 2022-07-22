import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import DataBase, { Id } from 'src/db/DataBase';
import { Track } from '../schemas/track.schema';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackService {
  findOne(id: Id): Promise<Track> {
    return DataBase.getById(id, 'tracks');
  }

  findAll(): Promise<Track[]> {
    return DataBase.getAll('tracks');
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newItem: Track = {
      ...createTrackDto,
      id: v4(),
    };
    DataBase.createItem(newItem, 'tracks');
    return newItem;
  }

  async delete(id: Id): Promise<Track> {
    const track = DataBase.deleteItem(id, 'tracks');
    const favorites = DataBase.getAll('favorites');

    favorites.tracks = favorites.tracks.filter((tarckId: Id) => id !== tarckId);
    DataBase.updateFavorites(favorites);

    return track;
  }

  async update(id: Id, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const oldItem = DataBase.getById(id, 'tracks');

    const newItem = {
      ...oldItem,
      ...updateTrackDto,
    };

    DataBase.putItem(newItem, 'tracks');

    return newItem;
  }
}
