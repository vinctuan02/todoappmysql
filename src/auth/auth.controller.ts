import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGruad } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './customize';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Public()
    @UseGuards(LocalAuthGruad)
    @Post("login")
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: CreateAuthDto) {
        return this.authService.handleRegister(registerDto)
    }

    @Public()
    @Get('mail')
    testEmail() {
        return this.authService.sendEmail()
    }
}
