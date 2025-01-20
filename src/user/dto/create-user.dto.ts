import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    @MinLength(2)
    first_name: string

    @IsNotEmpty()
    @MinLength(2)
    last_name: string

    @Length(10)
    phone_number: string

    profile_picture: string
}
