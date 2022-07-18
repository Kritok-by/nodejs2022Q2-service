import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import DataBase, { Id, IFavorites } from 'src/db/DataBase';
import { Favorites } from '../schemas/favorites.schema';

@Injectable()
export class FavoritesService {
  async get(): Promise<Favorites> {
    const favorites: IFavorites = DataBase.getAll('favorites');

    const resultArr = Object.entries(favorites).map(([key, value]) => [
      key,
      value.map((id: Id) => DataBase.getById(id, key)),
    ]);

    return Object.fromEntries(resultArr);
  }

  add(id: Id, type: string): Promise<Favorites> {
    try {
      const favorites = DataBase.getAll('favorites');

      DataBase.getById(id, type);

      favorites[type].push(id);
      favorites[type] = [...new Set(favorites[type])];

      DataBase.updateFavorites(favorites);

      return this.get();
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        throw new UnprocessableEntityException(`Not found`);
      }

      throw err;
    }
  }

  delete(id: Id, type: string): Promise<Favorites> {
    const favorites = DataBase.getAll('favorites');

    favorites[type] = favorites[type].filter((typeId: Id) => id !== typeId);

    DataBase.updateFavorites(favorites);

    return this.get();
  }
}
