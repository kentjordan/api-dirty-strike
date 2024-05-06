import { IsString, MinLength } from "class-validator"

export default class LoginDto {
    @IsString()
    username: string
    @IsString()
    @MinLength(8)
    password: string
}