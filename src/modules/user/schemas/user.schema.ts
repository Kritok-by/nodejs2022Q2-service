import { Id } from 'src/utils/types';

export class User {
  id: Id;
  login: string;

  password?: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
