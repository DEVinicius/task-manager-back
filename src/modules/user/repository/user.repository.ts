import { User } from '../model/user';
import { CreateUser } from './interfaces/create-user';

export interface UserRepository {
  findByEmail(email: string): Promise<User>;
  create(user: CreateUser): Promise<User>;
}
