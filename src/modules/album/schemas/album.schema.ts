import { Id } from 'src/utils/types';

export interface Album {
  id: Id; // uuid v4
  name: string;
  year: number;
  artistId: Id | null; // refers to Artist
}
