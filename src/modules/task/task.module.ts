import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskRepositoryDI } from './repository/__token__';
import { FindTasksService } from './services/find-tasks.service';
import { FindTaskService } from './services/find-task.service';
import { CreateTaskService } from './services/create-task.service';
import { TaskValidation } from './services/task-validation';

@Module({
  controllers: [TaskController],
  exports: [TaskRepositoryDI],
  providers: [
    TaskRepositoryDI,
    FindTasksService,
    FindTaskService,
    TaskValidation,
    CreateTaskService,
  ],
})
export class TaskModule {}
