import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    username: string;

    @MinLength(8)
    @MaxLength(30)
    password: string;
    lastname: string;
    firstname: string;
}