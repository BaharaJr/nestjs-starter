import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return await this.authService.register(authDto);
  }
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authDto) {
    return this.authService.login(authDto);
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  test( @GetUser() user: User  ){
  console.log(user)
  }
}
