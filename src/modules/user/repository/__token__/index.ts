import { PrismaUserRepository } from '../prisma/prisma-user.repository';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export const UserRepositoryDI = {
  useClass: PrismaUserRepository,
  provide: USER_REPOSITORY_TOKEN,
};
