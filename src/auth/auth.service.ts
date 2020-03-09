import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EntityRepository } from 'typeorm';
import { UserProfile } from './user.entity';
@EntityRepository(UserProfile)
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

}
