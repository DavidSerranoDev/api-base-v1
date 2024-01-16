import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/commons/commons.service';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseService<Users> {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>){
    super();
  }

  create(createUserDto: CreateUserDto){
    return this.userRepo.save(createUserDto);
  }

  findOneByEmail(email:string){
    return this.userRepo.findOneBy({email});
  }

  getRepository(): Repository<Users>{
      return this.userRepo;
  }
}
