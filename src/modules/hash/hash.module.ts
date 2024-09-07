import { Module } from '@nestjs/common';
import { HashDI } from './__token__';

@Module({
  providers: [HashDI],
  exports: [HashDI],
})
export class HashModule {}
