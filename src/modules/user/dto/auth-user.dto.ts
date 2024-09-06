import { IsEmail, IsString } from 'class-validator';

export class AuthUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
