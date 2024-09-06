import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../../model/user';
import { CreateUser } from '../interfaces/create-user';

@Injectable()
export class UserMemoryRepository implements UserRepository {
  private users: User[];

  private counter: number = 1;
  constructor() {
    this.users = [];
  }

  public async create(user: CreateUser): Promise<User> {
    const newUser: User = {
      email: user.email,
      id: this.counter,
      name: user.name,
      password: user.password,
    };

    this.users.push(newUser);

    this.counter = this.counter++;

    return newUser;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
