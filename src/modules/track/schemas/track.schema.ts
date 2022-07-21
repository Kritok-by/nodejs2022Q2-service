import { Id } from 'src/utils/types';

export class Track {
  id: Id; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number;
}
