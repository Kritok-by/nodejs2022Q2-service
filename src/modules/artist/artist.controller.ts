import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './schemas/artist.schema';
import { ArtistService } from './services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param() params): Promise<Artist> {
    return this.artistService.findOne(params.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() params,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params): Promise<Artist> {
    return this.artistService.delete(params.id);
  }
}
