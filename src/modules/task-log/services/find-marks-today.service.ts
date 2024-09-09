import { Inject, Injectable } from '@nestjs/common';
import { TASK_LOG_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskLogRepository } from '../repository/task-log.repository';
import { TASK_REPOSITORY_TOKEN } from 'src/modules/task/repository/__token__';
import { TaskRepository } from 'src/modules/task/repository/task.repository';
import { TaskLog } from '../model/task-log';

@Injectable()
export class FindMarksTodayService {
  constructor(
    @Inject(TASK_LOG_REPOSITORY_TOKEN)
    private readonly taskLogRepository: TaskLogRepository,
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(userId: number): Promise<TaskLog[]> {
    // get tasks of userId
    const tasks = await this.taskRepository.findByUserId(userId);
    console.log(tasks);
    if (tasks.length === 0) return [];

    const tasksIds = tasks.map((task) => task.id);
    console.log(tasksIds);

    const taskLogs = await this.taskLogRepository.findMarksToday(tasksIds);

    if (taskLogs.length === 0) return await this.createTaskLogs(tasksIds);

    return taskLogs;
  }

  private async createTaskLogs(tasksId: number[]): Promise<TaskLog[]> {
    for (let task of tasksId) {
      await this.taskLogRepository.create(task);
    }

    return await this.taskLogRepository.findMarksToday(tasksId);
  }
}
