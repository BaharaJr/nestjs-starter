import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EntityRepository } from 'typeorm';
import { UserProfile } from './user.entity';
import { AuthDto } from './dtos/auth-credentials.dto';
@EntityRepository(UserProfile)
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async signup(authDto: AuthDto): Promise<UserProfile> {
    return this.userRepository.create(authDto);
  }
}
