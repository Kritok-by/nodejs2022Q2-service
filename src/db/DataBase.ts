import { NotFoundException, BadRequestException } from '@nestjs/common';

import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const uuidValidateV4 = (uuid: string): boolean =>
  uuidValidate(uuid) && uuidVersion(uuid) === 4;

export type Id = string;

interface IUser {
  id: Id; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

interface IArtist {
  id: Id; // uuid v4
  name: string;
  grammy: boolean;
}

interface ITrack {
  id: Id; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

interface IAlbum {
  id: Id; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

type ItemType = IUser | IArtist | ITrack | IAlbum;

class DataBase {
  users: IUser[] = [];
  artists: IArtist[] = [];
  tracks: ITrack[] = [];
  albums: IAlbum[] = [];
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
