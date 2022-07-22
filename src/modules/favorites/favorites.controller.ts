import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
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
  deleteTrack(@Param() params): Promise<Favorites> {
    return this.favoritesService.delete(params.id, 'tracks');
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param() params): Promise<Favorites> {
    return this.favoritesService.add(params.id, 'tracks');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param() params): Promise<Favorites> {
    return this.favoritesService.delete(params.id, 'albums');
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param() params): Promise<Favorites> {
    return this.favoritesService.add(params.id, 'albums');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param() params): Promise<Favorites> {
    return this.favoritesService.delete(params.id, 'artists');
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param() params): Promise<Favorites> {
    return this.favoritesService.add(params.id, 'artists');
  }
}
