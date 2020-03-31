import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dtos/auth-credentials.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jtwpayload';
@EntityRepository(User)
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async register(authDto: AuthDto): Promise<{accessToken: string}> {
    return this.userRepository.register(authDto);
  }
  async login(authDto: AuthDto) {
    let username = await this.userRepository.validateUserPassword(authDto);
    if (!username) {
      throw new UnauthorizedException('Invalid access credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return {accessToken}
  }
}
