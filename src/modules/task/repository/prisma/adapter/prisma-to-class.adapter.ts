import { Task as TaskDatabase } from '@prisma/client';
import { Task } from 'src/modules/task/model/task';

export function PrismaToClassAdapter(task: TaskDatabase): Task {
  return {
    description: task.description,
    id: task.id,
    name: task.name,
    timesExecuted: task.timesExecuted,
    timesToComplete: task.timesToComplete,
    userId: task.userId,
  };
}
