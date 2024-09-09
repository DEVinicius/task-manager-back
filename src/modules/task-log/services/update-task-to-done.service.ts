import { Inject, Injectable } from '@nestjs/common';
import { TaskLog } from '../model/task-log';
import { TASK_LOG_REPOSITORY_TOKEN } from '../repository/__token__';
import { TaskLogRepository } from '../repository/task-log.repository';

@Injectable()
export class UpdateTaskToDoneService {
  constructor(
    @Inject(TASK_LOG_REPOSITORY_TOKEN)
    private readonly taskLogRepository: TaskLogRepository,
  ) {}

  public async execute(taskLogId: number): Promise<TaskLog> {
    //atualizar task
    const taskLog = await this.taskLogRepository.findById(taskLogId);
    return taskLog;
  }
}
