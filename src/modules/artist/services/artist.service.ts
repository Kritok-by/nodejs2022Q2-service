import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import DataBase, { Id } from 'src/db/DataBase';
import { Artist } from '../schemas/artist.schema';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

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
    return DataBase.deleteItem(id, 'artists');
  }

  async update(id: Id, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const oldItem = DataBase.getById(id, 'artists');

    console.log('update', updateArtistDto);
    console.log('old', oldItem);

    const newItem = {
      ...oldItem,
      ...updateArtistDto,
    };
    console.log('new', newItem);

    DataBase.putItem(newItem, 'artists');

    return newItem;
  }
}
