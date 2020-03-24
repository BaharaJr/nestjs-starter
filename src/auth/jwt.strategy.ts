import { JwtPayload } from './jtwpayload';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'bennett89',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
