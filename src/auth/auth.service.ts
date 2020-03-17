import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dtos/auth-credentials.dto';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
@EntityRepository(User)
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async register(authDto: AuthDto): Promise<User> {
    return this.userRepository.register(authDto);
  }
  async login(authDto: AuthDto) {
    let user = await this.userRepository.validateUserPassword(authDto);
    if(!user){
      throw new UnauthorizedException('Invalid access credentials')
    }
  }
}
