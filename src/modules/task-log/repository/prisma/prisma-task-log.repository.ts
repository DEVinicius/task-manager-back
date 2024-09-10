import { Injectable } from '@nestjs/common';
import { TaskLogRepository } from '../task-log.repository';
import { TaskLog } from '../../model/task-log';
import { PRISMA_CONN } from 'src/config/database/prisma';
import { PrismaClient } from '@prisma/client';
import { startOfToday, endOfToday } from 'date-fns';

@Injectable()
export class PrismaTaskLogRepository implements TaskLogRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = PRISMA_CONN;
  }
  public async findById(id: number): Promise<TaskLog> {
    const taskLog = await this.prisma.taskLog.findFirst({
      where: { id },
      include: {
        task: true,
      },
    });

    return {
      createdAt: taskLog.createdAt,
      isDone: taskLog.isDone,
      id: taskLog.id,
      task: {
        description: taskLog.task.description,
        id: taskLog.task.id,
        name: taskLog.task.name,
        timesExecuted: taskLog.task.timesExecuted,
        timesToComplete: taskLog.task.timesToComplete,
        userId: taskLog.task.userId,
      },
    };
  }

  public async updateTaskToDone(id: number): Promise<TaskLog> {
    await this.prisma.taskLog.update({
      where: {
        id,
      },
      data: {
        isDone: true,
      },
    });

    return await this.findById(id);
  }

  public async create(taskId: number): Promise<void> {
    const taskLog = await this.prisma.taskLog.create({
      data: {
        taskId,
      },
    });
  }

  public async findMarksToday(tasksId: number[]): Promise<TaskLog[]> {
    const tasks = await this.prisma.taskLog.findMany({
      where: {
        taskId: {
          in: tasksId,
        },
        createdAt: {
          gte: startOfToday(),
          lte: endOfToday(),
        },
      },
      orderBy: {
        isDone: 'asc',
      },
      include: {
        task: true,
      },
    });

    return tasks.map((task) => {
      return {
        createdAt: task.createdAt,
        isDone: task.isDone,
        id: task.id,
        task: {
          description: task.task.description,
          id: task.task.id,
          name: task.task.name,
          timesExecuted: task.task.timesExecuted,
          timesToComplete: task.task.timesToComplete,
          userId: task.task.userId,
        },
      };
    });
  }
}
