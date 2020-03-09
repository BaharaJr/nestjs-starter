import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dtos/auth-credentials.dto';
@EntityRepository(User)
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async signup(authDto: AuthDto): Promise<User> {
    return this.userRepository.create(authDto);
  }
}
