import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Entity } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Entity)
    private userRepository: UserRepository,
  ) {}
}
