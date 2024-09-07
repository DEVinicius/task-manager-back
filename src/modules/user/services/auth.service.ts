import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '../repository/__token__';
import { UserRepository } from '../repository/user.repository';
import { AuthUserDTO } from '../dto/auth-user.dto';
import { Auth } from '../model/auth';
import { JwtService } from '@nestjs/jwt';
import { HASH_TOKEN } from 'src/modules/hash/__token__';
import { Hash } from 'src/modules/hash/hash';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject(HASH_TOKEN)
    private readonly hash: Hash,
  ) {}

  public async execute(data: AuthUserDTO): Promise<Auth> {
    //buscar usuario
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new Error('Usuário / Senha Incorreto(s)');
    await this.checkPassword(data.password, user.password);

    const payload = { sub: user.id, name: user.name, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async checkPassword(password: string, hashedPassword: string) {
    const comparePassword = await this.hash.compare(password, hashedPassword);

    if (!comparePassword) throw new Error('Usuário / Senha Incorreto(s)');
  }
}
