import { TaskLog } from '../model/task-log';

export interface TaskLogRepository {
  create(taskId: number): Promise<void>;
  findMarksToday(tasksId: number[]): Promise<TaskLog[]>;
  updateTaskToDone(id: number): Promise<TaskLog>;
  findById(id: number): Promise<TaskLog>
}
