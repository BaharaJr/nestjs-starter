import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dtos/auth-credentials.dto';
import { UserProfile } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    private authService: AuthService
    @Post('/signup')
    async signup(@Body(ValidationPipe) authDto: AuthDto): Promise<UserProfile>{
        return this.authService.signup(authDto)
    }
}
