import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const users = [
  {
    id: 1,
    name: 'Tarcisio',
    email: 'tarcisio@yduqs.com.br',
    age: 30,
  },
  {
    id: 2,
    name: 'Tássia',
    email: 'tássia@yduqs.com.br',
    age: 30,
  },
  {
    id: 3,
    name: 'Mairton',
    email: 'mairton@yduqs.com.br',
    age: 30,
  },
  {
    id: 4,
    name: 'Marcos',
    email: 'marcos@yduqs.com.br',
    age: 30,
  },
];

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    try {
      return createUserDto;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return users;
  }

  findOne(id: number) {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException({
        status: 'error',
        timestamp: new Date().toISOString(),
        error: `Not found user ID ${id}`,
      });
    }

    return user;
  }
}
