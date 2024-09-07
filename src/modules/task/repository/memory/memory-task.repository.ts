import { Task } from 'src/modules/task/model/task';
import { CreateTaskDTO } from '../../dto/create-task.dto';
import { TaskRepository } from '../task.repository';
import { CreateTask } from '../interfaces/create-task';

export class MemoryTaskRepository implements TaskRepository {
  private tasks: Task[];

  private id: number;

  constructor() {
    this.tasks = [];
    this.id = 1;
  }
  public async updateExecutedTime(id: number): Promise<Task> {
    const newTasks = this.tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            timesExecuted: task.timesExecuted + 1,
          }
        : task,
    );

    this.tasks = newTasks;

    return this.findById(id);
  }

  public async remove(id: number): Promise<void> {
    const newTasks = this.tasks.filter((task) => task.id != id);
    this.tasks = newTasks;
  }

  public async findByUserId(userId: number): Promise<Task[]> {
    const tasks = this.tasks.filter((task) => task.userId === userId);
    return tasks;
  }

  public async findById(id: number): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) return null;
    return task;
  }

  public async create(data: CreateTask): Promise<Task> {
    const task: Task = {
      description: data.description,
      id: this.id,
      name: data.name,
      timesExecuted: 0,
      timesToComplete: data.timesToComplete,
      userId: data.userId,
    };

    this.tasks.push(task);

    return task;
  }
}
