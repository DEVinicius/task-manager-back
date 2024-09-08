import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class TaskValidation {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async validateTaskOwner(
    taskId: number,
    userId: number,
  ): Promise<void> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) throw new Error('Tarefa não encontrada');

    if (task.userId != userId) throw new Error('Serviço não permitido');
  }
}
