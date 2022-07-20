import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistService } from '../artist/services/artist.service';
import { AlbumService } from '../album/services/album.service';
import { TrackService } from '../track/services/track.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistService, AlbumService, TrackService],
})
export class FavoritesModule {}
