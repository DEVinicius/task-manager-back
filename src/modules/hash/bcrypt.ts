import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { Hash } from './hash';

@Injectable()
export class BcryptHash implements Hash {
  async create(data: string): Promise<string> {
    const saltRounds = 10;

    const hash = bcrypt.hashSync(data, saltRounds);
    return hash;
  }

  async compare(info: string, hashedData: string): Promise<boolean> {
    return bcrypt.compareSync(info, hashedData);
  }
}
