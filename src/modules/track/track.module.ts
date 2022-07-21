import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './services/track.service';
import { FavoritesService } from '../favorites/services/favorites.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FavoritesService],
})
export class TrackModule {}
