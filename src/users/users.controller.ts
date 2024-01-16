import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from 'src/commons/commons.controller';
import { Users } from './entities/users.entity';
import { BaseService } from 'src/commons/commons.service';

@Controller('users')
export class UsersController extends BaseController<Users> {

  constructor(private readonly usersService: UsersService) {
    super();
  }

  getService(): BaseService<Users> {
    return this.usersService;
  }

}
