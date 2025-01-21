import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGruad } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './customize';

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
}
