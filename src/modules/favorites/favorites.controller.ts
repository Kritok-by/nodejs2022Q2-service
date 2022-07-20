import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Id } from 'src/utils/types';
import { Favorites } from './schemas/favorites.schema';
import { FavoritesService } from './services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  get(): Promise<Favorites> {
    return this.favoritesService.get();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<{ id: Id }> {
    return this.favoritesService.delete(id, 'tracks');
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<{ id: Id }> {
    return this.favoritesService.add(id, 'tracks');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<{ id: Id }> {
    return this.favoritesService.delete(id, 'albums');
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<{ id: Id }> {
    return this.favoritesService.add(id, 'albums');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<{ id: Id }> {
    return this.favoritesService.delete(id, 'artists');
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<{ id: Id }> {
    return this.favoritesService.add(id, 'artists');
  }
}
