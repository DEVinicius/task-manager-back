import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryDI } from './repository/__token__';
import { CreateUserService } from './services/create-user.service';
import { AuthService } from './services/auth.service';
import { HashModule } from '../hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [UserController],
  providers: [UserRepositoryDI, CreateUserService, AuthService],
  imports: [
    HashModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${60 * 60 * 24}s` },
    }),
  ],
})
export class UserModule {}
