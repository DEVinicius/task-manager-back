import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '../repository/__token__';
import { UserRepository } from '../repository/user.repository';
import { AuthUserDTO } from '../dto/auth-user.dto';
import { Auth } from '../model/auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(data: AuthUserDTO): Promise<Auth> {
    return {
        token: ''
    }
  }
}
