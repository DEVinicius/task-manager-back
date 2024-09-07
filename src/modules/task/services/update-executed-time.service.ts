import { Inject } from '@nestjs/common';
import { TASK_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskRepository } from '../repository/task.repository';
import { TaskValidation } from './task-validation';

export class UpdateExecutedTimeService {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
    private readonly taskValidation: TaskValidation
  ) {}

  public async execute(taskId: number, userId: number) {
    await this.taskValidation.validateTaskOwner(taskId, userId);

    return await this.taskRepository.updateExecutedTime(taskId);
  }
}
