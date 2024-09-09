import { PrismaClient } from '@prisma/client';
import { User } from '../../model/user';
import { CreateUser } from '../interfaces/create-user';
import { UserRepository } from '../user.repository';
import { PRISMA_CONN } from 'src/config/database/prisma';

export class PrismaUserRepository implements UserRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = PRISMA_CONN;
  }
  public async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return null;

    return {
      email: user.email,
      id: user.id,
      name: user.name,
      password: user.password,
    };
  }

  public async create(user: CreateUser): Promise<User> {
    const userCreated = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return {
      email: userCreated.email,
      id: userCreated.id,
      name: userCreated.name,
      password: userCreated.password,
    };
  }
}
