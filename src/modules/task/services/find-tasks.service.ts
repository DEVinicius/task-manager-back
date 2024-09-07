import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../model/task';
import { TaskRepository } from '../repository/task.repository';
import { TASK_REPOSITORY_TOKEN } from '../repository/__token__';

@Injectable()
export class FindTasksService {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}
  
  public async execute(userId: number): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUserId(userId);

    return tasks;
  }
}
