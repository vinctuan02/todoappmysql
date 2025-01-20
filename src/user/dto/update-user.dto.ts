import { Exclude } from "class-transformer"
import { Length, MinLength } from "class-validator"

export class UpdateUserDto {
        @MinLength(6)
        password: string
    
        @MinLength(2)
        first_name: string
    
        @MinLength(2)
        last_name: string
    
        @Length(10)
        phone_number: string
    
        profile_picture: string
}
