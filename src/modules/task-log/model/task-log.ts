import { Task } from 'src/modules/task/model/task';

export class TaskLog {
  id: number;
  task: Task;
  createdAt: Date;
  isDone: boolean;
}
