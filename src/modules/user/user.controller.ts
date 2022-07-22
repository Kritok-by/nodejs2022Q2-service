import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param() params): Promise<User> {
    return this.userService.findOne(params.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = { ...(await this.userService.create(createUserDto)) };
    delete user.password;
    return user;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() params,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = {
      ...(await this.userService.update(params.id, updatePasswordDto)),
    };
    delete user.password;
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params): Promise<User> {
    return this.userService.delete(params.id);
  }
}
