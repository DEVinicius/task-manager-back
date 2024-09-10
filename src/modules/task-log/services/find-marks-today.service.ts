import { Inject, Injectable } from '@nestjs/common';
import { TASK_LOG_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskLogRepository } from '../repository/task-log.repository';
import { TASK_REPOSITORY_TOKEN } from 'src/modules/task/repository/__token__';
import { TaskRepository } from 'src/modules/task/repository/task.repository';
import { TaskLog } from '../model/task-log';
import { Task } from 'src/modules/task/model/task';

@Injectable()
export class FindMarksTodayService {
  constructor(
    @Inject(TASK_LOG_REPOSITORY_TOKEN)
    private readonly taskLogRepository: TaskLogRepository,
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(userId: number): Promise<TaskLog[]> {
    const tasks = await this.taskRepository.findByUserId(userId);
    if (tasks.length === 0) return [];

    const tasksIds = tasks.map((task) => task.id);

    const taskLogs = await this.taskLogRepository.findMarksToday(tasksIds);

    console.log(this.validateTaskLogs(taskLogs, tasks));

    if (this.validateTaskLogs(taskLogs, tasks))
      return await this.createTaskLogs(
        tasksIds.filter((t) => !taskLogs.find((tl) => tl.task.id === t)),
      );

    return taskLogs;
  }

  private validateTaskLogs(taskLogs: TaskLog[], tasks: Task[]) {
    return (
      this.ensureTaskLogsIsEmpty(taskLogs.length) ||
      this.ensureTaskLogsLengthIsEqualTasks(taskLogs.length, tasks.length)
    );
  }

  private ensureTaskLogsLengthIsEqualTasks(
    taskLogsLength: number,
    tasksLength: number,
  ): boolean {
    return taskLogsLength != tasksLength;
  }

  private ensureTaskLogsIsEmpty(tasksLogsLength: number): boolean {
    return tasksLogsLength === 0;
  }

  private async createTaskLogs(tasksId: number[]): Promise<TaskLog[]> {
    for (let task of tasksId) {
      await this.taskLogRepository.create(task);
    }

    return await this.taskLogRepository.findMarksToday(tasksId);
  }
}
