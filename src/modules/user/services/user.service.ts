import { createHash } from 'crypto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExistHandler, NotFoundHandler } from 'src/utils/errorHandlers';
import { Id } from 'src/utils/types';

const hashPWD = (password: string) =>
  password ? createHash('sha256').update(password).digest('hex') : '';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: Id): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        where: { id },
        select: {
          id: true,
          password: false,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch {
      NotFoundHandler('User', id);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        password: false,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const newItem = {
      login: login,
      password: hashPWD(password),
      id: v4(),
      createdAt: new Date().getTime(),
      version: 1,
      updatedAt: new Date().getTime(),
    };

    try {
      return await this.prisma.user.create({
        data: newItem,
      });
    } catch {
      ExistHandler(login);
    }
  }

  async delete(id: Id): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch {
      NotFoundHandler('User', id);
    }
  }

  async update(id: Id, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const { oldPassword, newPassword } = { ...updatePasswordDto };
    const newPasswordHash = hashPWD(newPassword);
    let user: User;
    try {
      user = await this.prisma.user.findUnique({
        where: { id },
      });
    } catch {
      NotFoundHandler('User', id);
    }

    if (user.password !== hashPWD(oldPassword))
      throw new ForbiddenException('old passowrd is wrong');

    if (user.password === newPasswordHash) {
      throw new ForbiddenException('new passowrd is same as old password');
    }

    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: newPasswordHash,
        updatedAt: new Date().getTime(),
        version: user.version + 1,
      },
    });
  }
}
