import { Exclude } from 'class-transformer';
import { Id } from 'src/db/DataBase';

export class User {
  id: Id;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
