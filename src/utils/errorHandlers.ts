import { NotFoundException, ConflictException } from '@nestjs/common';

export const NotFoundHandler = (name: string, id: string) => {
  throw new NotFoundException(`${name} '${id}' not found`);
};

export const ExistHandler = (name: string) => {
  throw new ConflictException(`'${name}' already exists`);
};
