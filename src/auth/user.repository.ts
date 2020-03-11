import { Repository, EntityRepository, Entity } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dtos/auth-credentials.dto';
import * as uid from 'uid';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authDto: AuthDto): Promise<any> {
    const { password, username, firstname, lastname } = authDto;
    const user = new User();
    user.username = username;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;
    user.uid = uid();

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
       throw new InternalServerErrorException()
      }
    }
  }
}
