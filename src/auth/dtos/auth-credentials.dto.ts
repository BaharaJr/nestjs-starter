import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    username: string;

    @MinLength(4)
    @MaxLength(30)
    @IsNotEmpty()
    password: string;
    lastname: string;
    firstname: string;
}