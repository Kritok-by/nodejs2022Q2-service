import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './services/artist.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
