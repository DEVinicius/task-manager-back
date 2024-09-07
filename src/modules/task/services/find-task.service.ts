import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TASK_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskValidation } from './task-validation';

@Injectable()
export class FindTaskService {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
    private readonly taskValidation: TaskValidation,
  ) {}

  public async execute(taskId: number, userId: number) {
    const task = await this.taskRepository.findById(taskId);

    if (task.userId != userId) throw new Error('Task indisponível');

    return task;
  }
}
