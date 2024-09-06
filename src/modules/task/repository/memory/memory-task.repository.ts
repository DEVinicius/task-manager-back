import { Task } from 'src/modules/model/task';
import { CreateTaskDTO } from '../../dto/create-task.dto';
import { TaskRepository } from '../task.repository';

export class MemoryTaskRepository implements TaskRepository {
    public async create(data: CreateTaskDTO): Promise<Task> {
        throw new Error('Method not implemented.');
    }
}
