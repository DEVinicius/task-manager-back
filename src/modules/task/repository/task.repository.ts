import { Task } from 'src/modules/model/task';
import { CreateTaskDTO } from '../dto/create-task.dto';

export interface TaskRepository {
  create(data: CreateTaskDTO): Promise<Task>;
}
