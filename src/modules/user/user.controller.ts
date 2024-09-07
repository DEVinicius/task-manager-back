import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user.service';
import { AuthUserDTO } from './dto/auth-user.dto';
import { AuthService } from './services/auth.service';
import { Public } from 'src/public';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly authService: AuthService,
  ) {}

  @Post('')
  public async create(@Body() body: CreateUserDTO) {
    try {
      const user = await this.createUserService.execute(body);
      return {
        id: user.id,
        name: user.name,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Post('auth')
  public async auth(@Body() body: AuthUserDTO) {
    try {
      const user = await this.authService.execute(body);
      return user;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }
}
