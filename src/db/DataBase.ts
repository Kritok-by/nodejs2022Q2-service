import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Album } from 'src/modules/album/schemas/album.schema';
import { Artist } from 'src/modules/artist/schemas/artist.schema';
import { Track } from 'src/modules/track/schemas/track.schema';
import { User } from 'src/modules/user/schemas/user.schema';

import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const uuidValidateV4 = (uuid: string): boolean =>
  uuidValidate(uuid) && uuidVersion(uuid) === 4;

export type Id = string;

type ItemType = User | Artist | Track | Album;

export interface IFavorites {
  artists: Id[];
  albums: Id[];
  tracks: Id[];
}

class DataBase {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll = (table: string) => this[table];

  getById = (id: Id, table: string) => {
    if (!uuidValidateV4(id))
      throw new BadRequestException(`Ooops, "${id}" is invalid (not uuid)!`);

    const item = this[table]?.find((item: ItemType) => item.id === id);

    if (!item) throw new NotFoundException(`Does not exist!`);

    return item;
  };

  updateFavorites = (favorites: IFavorites) => (this.favorites = favorites);

  createItem = (item: ItemType, table: string) => this[table]?.push(item);

  putItem = (item: ItemType, table: string) => {
    if (!uuidValidateV4(item.id))
      throw new BadRequestException(
        `Ooops, "${item.id}" is invalid (not uuid)!`,
      );

    const elem = this[table].find((i: ItemType) => item.id === i.id);

    if (!elem) throw new NotFoundException(`Does not exist!`);

    this[table] = this[table].map((i: ItemType) =>
      i.id === item.id ? item : i,
    );
  };

  deleteItem = (id: Id, table: string) => {
    if (!uuidValidateV4(id))
      throw new BadRequestException(`Ooops, "${id}" is invalid (not uuid)!`);

    const item = this[table].find((item: ItemType) => item.id === id);

    if (!item) throw new NotFoundException(`Does not exist!`);

    this[table] = this[table]?.filter((item: ItemType) => item.id !== id);

    return item;
  };
}

export default new DataBase();
