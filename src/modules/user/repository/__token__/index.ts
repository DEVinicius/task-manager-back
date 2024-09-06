import { UserMemoryRepository } from '../memory/user-memory.repository';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export const UserRepositoryDI = {
  useClass: UserMemoryRepository,
  provide: USER_REPOSITORY_TOKEN,
};
