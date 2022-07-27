import { Module } from '@nestjs/common';
import { FavoritesService } from '../favorites/services/favorites.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './services/artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, FavoritesService],
})
export class ArtistModule {}
