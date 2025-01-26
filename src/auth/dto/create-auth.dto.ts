import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateAuthDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsOptional()
    first_name: string

    @IsOptional()
    last_name: string
}