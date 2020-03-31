import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  @Matches(
    new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'),
    { message: 'Password too weak' },
  )
  password: string;
  lastname: string;
  firstname: string;
}
