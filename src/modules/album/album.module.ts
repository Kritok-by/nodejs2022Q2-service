import { Module } from '@nestjs/common';
import { FavoritesService } from '../favorites/services/favorites.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './services/album.service';

@Module({
  // imports: [FavoritesModule],
  controllers: [AlbumController],
  providers: [AlbumService, FavoritesService],
})
export class AlbumModule {}
