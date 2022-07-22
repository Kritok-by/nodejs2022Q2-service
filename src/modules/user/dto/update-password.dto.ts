import { IsDefined, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsDefined()
  oldPassword: string;

  @IsString()
  @IsDefined()
  newPassword: string;
}
