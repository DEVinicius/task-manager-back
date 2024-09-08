import { Task } from 'src/modules/task/model/task';
import { CreateTask } from './interfaces/create-task';
import { UpdateTaskDTO } from '../dto/update-task.dto';

export interface TaskRepository {
  create(data: CreateTask): Promise<Task>;
  findByUserId(userId: number): Promise<Task[]>;
  findById(id: number): Promise<Task>;
  remove(id: number): Promise<void>;
  updateExecutedTime(id: number): Promise<Task>;
  update(id: number, task: UpdateTaskDTO): Promise<Task>;
}
