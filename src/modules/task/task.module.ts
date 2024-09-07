import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskRepositoryDI } from './repository/__token__';

@Module({
  controllers: [TaskController],
  providers: [TaskRepositoryDI],
})
export class TaskModule {}
