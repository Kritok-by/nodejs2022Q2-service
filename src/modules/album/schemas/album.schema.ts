import { Id } from 'src/db/DataBase';

export interface Album {
  id: Id; // uuid v4
  name: string;
  year: number;
  artistId: Id | null; // refers to Artist
}
