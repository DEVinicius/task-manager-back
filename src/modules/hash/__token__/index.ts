import { BcryptHash } from '../bcrypt';

export const HASH_TOKEN = 'HASH_TOKEN';

export const HashDI = {
  provide: HASH_TOKEN,
  useClass: BcryptHash,
};
