import { Task } from 'src/modules/task/model/task';
import { CreateTask } from './interfaces/create-task';

export interface TaskRepository {
  create(data: CreateTask): Promise<Task>;
  findByUserId(userId: number): Promise<Task[]>;
  findById(id: number): Promise<Task>;
  remove(id: number): Promise<void>;
}
