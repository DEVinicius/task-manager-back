import { PrismaClient } from '@prisma/client';
import { UpdateTaskDTO } from '../../dto/update-task.dto';
import { Task } from '../../model/task';
import { CreateTask } from '../interfaces/create-task';
import { TaskRepository } from '../task.repository';
import { PRISMA_CONN } from 'src/config/database/prisma';
import { PrismaToClassAdapter } from './adapter/prisma-to-class.adapter';

export class PrismaTaskRepository implements TaskRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = PRISMA_CONN;
  }

  public async create(taskToCreate: CreateTask): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        ...taskToCreate,
      },
    });

    return {
      description: task.description,
      id: task.id,
      name: task.name,
      timesExecuted: task.timesExecuted,
      timesToComplete: task.timesToComplete,
      userId: task.userId,
    };
  }

  public async findByUserId(userId: number): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
    });

    return tasks.map((task) => {
      return PrismaToClassAdapter(task);
    });
  }

  public async findById(id: number): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });

    return PrismaToClassAdapter(task);
  }

  public async remove(id: number): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }

  public async updateExecutedTime(id: number): Promise<Task> {
    let task = await this.findById(id);

    await this.prisma.task.update({
      where: { id },
      data: {
        timesExecuted: task.timesExecuted + 1,
      },
    });

    return {
      ...task,
      timesExecuted: task.timesExecuted + 1,
    };
  }

  public async update(id: number, task: UpdateTaskDTO): Promise<Task> {
    await this.prisma.task.update({
      where: { id },
      data: {
        ...task,
      },
    });

    return this.findById(id);
  }
}
