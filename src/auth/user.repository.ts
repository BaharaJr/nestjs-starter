import { Repository, EntityRepository } from 'typeorm';
import { UserProfile } from './user.entity';
import { AuthDto } from './dtos/auth-credentials.dto';
import * as uid from 'uid';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
  async signUp(authDto: AuthDto): Promise<UserProfile> {
    const { password, username, firstname, lastname } = authDto;
    const user = new UserProfile();
    user.username = username;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname
    user.uid = uid();
    user.save();
    return user;
  }
}
