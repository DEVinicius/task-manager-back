import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { USER_REPOSITORY_TOKEN } from '../repository/__token__';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}
  public async execute(data: CreateUserDTO) {
    if (!this.checkPasswordSimilarity(data.password, data.confirmPassword))
      throw new Error('Senha e confirmar Senha devem ser iguais');

    if (await this.ensureEmailAlreadyExists(data.email))
      throw new Error('Usuário existente em nossa base');

    // Realizar Cadastro
    const user = await this.userRepository.create({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    return user;
  }

  private checkPasswordSimilarity(
    password: string,
    confirmPassword: string,
  ): boolean {
    return password === confirmPassword;
  }

  private async ensureEmailAlreadyExists(email: string): Promise<boolean> {
    const searchEmail = await this.userRepository.findByEmail(email);

    return !!searchEmail;
  }
}
