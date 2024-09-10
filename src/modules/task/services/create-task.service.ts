import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { TASK_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class CreateTaskService {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(data: CreateTaskDTO, userId: number) {
    console.log({ data, userId });
    const task = await this.taskRepository.create({
      ...data,
      userId,
    });

    return task;
  }
}
