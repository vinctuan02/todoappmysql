import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helper/password.helper';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const userByEmail = await this.userService.findUserByEmail(email)

        if (!userByEmail)
            throw new BadRequestException("Invalid Email")
        const passwordValid = await comparePassword(pass, userByEmail.password)

        if (!passwordValid) {
            throw new UnauthorizedException("Invalid Password")
        }

        const payload = { id: userByEmail.id, email: userByEmail.email }

        return { access_token: await this.jwtService.signAsync(payload) }
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const userByEmail = await this.userService.findUserByEmail(email)

        if (!userByEmail) {
            return null
        }

        const passwordValid = await comparePassword(pass, userByEmail.password)
        if (userByEmail && passwordValid) {
            const { password, ...result } = userByEmail
            return result
        }

        return null
    }

    async login(user: User): Promise<{ access_token: string }> {
        const passport = { id: user.id, email: user.email }
        const access_token = await this.jwtService.signAsync(passport)
        return { access_token: access_token }
    }
}
