import { Inject, Injectable } from '@nestjs/common';
import { TaskLog } from '../model/task-log';
import { TASK_LOG_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskLogRepository } from '../repository/task-log.repository';
import { TASK_REPOSITORY_TOKEN } from 'src/modules/task/repository/__token__';
import { TaskRepository } from 'src/modules/task/repository/task.repository';

@Injectable()
export class UpdateTaskToDoneService {
  constructor(
    @Inject(TASK_LOG_REPOSITORY_TOKEN)
    private readonly taskLogRepository: TaskLogRepository,
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(taskLogId: number): Promise<TaskLog> {
    //atualizar task
    const taskLog = await this.taskLogRepository.updateTaskToDone(taskLogId);

    await this.taskRepository.updateExecutedTime(taskLog.task.id);
    return taskLog;
  }
}
