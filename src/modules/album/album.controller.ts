import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './schemas/album.schema';
import { AlbumService } from './services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<Album> {
    return this.albumService.findOne(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id): Promise<Album> {
    return this.albumService.delete(id);
  }
}
