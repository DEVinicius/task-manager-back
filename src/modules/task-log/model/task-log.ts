import { Task } from 'src/modules/task/model/task';

export class TaskLog {
  task: Task;
  createdAt: Date;
  isDone: boolean;
}
