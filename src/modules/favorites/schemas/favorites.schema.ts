import { Album } from 'src/modules/album/schemas/album.schema';
import { Artist } from 'src/modules/artist/schemas/artist.schema';
import { Track } from 'src/modules/track/schemas/track.schema';

export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
