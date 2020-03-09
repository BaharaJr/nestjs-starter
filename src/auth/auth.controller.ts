import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    private authService: AuthService
    @Post('/signup')
    signup(@Body(ValidationPipe) authDto: AuthDto): Promise<User>{
        return this.authService.signup(authDto)
    }
}
