import { PrismaTaskLogRepository } from '../prisma/prisma-task-log.repository';

export const TASK_LOG_REPOSITORY_TOKEN = 'TASK_LOG_REPOSITORY_TOKEN';

export const TaskLogDI = {
  provide: TASK_LOG_REPOSITORY_TOKEN,
  useClass: PrismaTaskLogRepository,
};
