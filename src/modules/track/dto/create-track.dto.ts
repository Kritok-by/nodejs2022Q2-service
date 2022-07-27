import {
  IsDefined,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Id } from 'src/utils/types';

export class CreateTrackDto {
  @IsString()
  @IsDefined()
  name: string;

  @ValidateIf((_, value) => !(value === null))
  @IsUUID('4')
  artistId: Id | null; // refers to Artist

  @ValidateIf((_, value) => !(value === null))
  @IsUUID('4')
  albumId: Id | null; // refers to Album

  @IsNumber()
  @IsDefined()
  duration: number;
}
