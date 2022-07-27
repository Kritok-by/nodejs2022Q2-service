import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { Id } from 'src/utils/types';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @ValidateIf((_, value) => !(value === null))
  @IsUUID('4')
  artistId: Id | null; // refers to Artist

  @IsNumber()
  year: number;
}
