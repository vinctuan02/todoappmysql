import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Post("login")
    async login(@Body() signDto: LoginDto) {
        return this.authService.signIn(signDto.email, signDto.password)
    }
}
