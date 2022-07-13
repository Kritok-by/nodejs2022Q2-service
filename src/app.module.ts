import { Module } from '@nestjs/common';
import { ArtistModule } from './modules/artist/artist.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ArtistModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
