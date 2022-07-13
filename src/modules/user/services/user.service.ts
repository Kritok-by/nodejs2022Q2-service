import { ForbiddenException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import DataBase, { Id } from 'src/db/DataBase';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UserService {
  findOne(id: Id): Promise<User> {
    return DataBase.getById(id, 'users');
  }

  findAll(): Promise<User[]> {
    return DataBase.getAll('users');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newItem: User = {
      ...createUserDto,
      id: v4(),
      createdAt: new Date().getTime(),
      version: 1,
      updatedAt: new Date().getTime(),
    };
    DataBase.createItem(newItem, 'users');
    return newItem;
  }

  async delete(id: Id): Promise<User> {
    return DataBase.deleteItem(id, 'users');
  }

  async update(id: Id, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const { oldPassword, newPassword } = { ...updatePasswordDto };
    const oldItem = DataBase.getById(id, 'users');
    console.log(updatePasswordDto);

    if (oldItem?.password === newPassword)
      throw new ForbiddenException(
        'old password and new password doesnt be match',
      );

    if (oldItem?.password !== oldPassword)
      throw new ForbiddenException('old password doesnt match');

    const newItem = {
      ...oldItem,
      password: newPassword,
      version: oldItem.version + 1,
      updatedAt: new Date().getTime(),
    };
    DataBase.putItem(newItem, 'users');
    return newItem;
  }
}
