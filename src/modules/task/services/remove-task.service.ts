import { Inject } from '@nestjs/common';
import { TASK_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskRepository } from '../repository/task.repository';

export class RemoveTaskService {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(taskId: number, userId: number) {
    const task = await this.taskRepository.findById(taskId);

    if (task.userId != userId) throw new Error('Serviço não permitido');

    await this.taskRepository.remove(taskId);
  }
}
