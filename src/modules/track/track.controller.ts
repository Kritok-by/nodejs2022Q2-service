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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './schemas/track.schema';
import { TrackService } from './services/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<Track> {
    const test = this.trackService.findOne(id);

    return test;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id,
  ): Promise<Track> {
    return this.trackService.delete(id);
  }
}
