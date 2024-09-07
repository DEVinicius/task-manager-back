import { MemoryTaskRepository } from '../memory/memory-task.repository';

export const TASK_REPOSITORY_TOKEN = 'TASK_REPOSITORY_TOKEN';

export const TaskRepositoryDI = {
  provide: TASK_REPOSITORY_TOKEN,
  useClass: MemoryTaskRepository,
};
