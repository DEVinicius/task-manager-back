import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryDI } from './repository/__token__';
import { CreateUserService } from './services/create-user.service';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserRepositoryDI, CreateUserService, AuthService],
})
export class UserModule {}
