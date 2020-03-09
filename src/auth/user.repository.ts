import { Repository, EntityRepository, Entity } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dtos/auth-credentials.dto';
import * as uid from 'uid';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authDto: AuthDto): Promise<User> {
    const { password, username, firstname, lastname } = authDto;
    const user = new User();
    user.username = username;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;
    user.uid = uid();
    await user.save();
    return user;
  }
}
