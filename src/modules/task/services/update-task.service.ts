import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TASK_REPOSITORY_TOKEN } from '../repository/__token__';
import { UpdateTaskDTO } from '../dto/update-task.dto';
import { TaskValidation } from './task-validation';

@Injectable()
export class UpdateTaskService {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
    private readonly taskValidation: TaskValidation,
  ) {}

  public async execute(id: number, data: UpdateTaskDTO, userId: number) {
    await this.taskValidation.validateTaskOwner(id, userId);

    const task = await this.taskRepository.update(id, data);

    return task;
  }
}
