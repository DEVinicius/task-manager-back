import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpException,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../user/guard/auth.guard';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FindTasksService } from './services/find-tasks.service';
import { CreateTaskService } from './services/create-task.service';

@Controller('task')
@Injectable()
export class TaskController {
  constructor(
    private readonly searchTasks: FindTasksService,
    private readonly createTask: CreateTaskService,
  ) {}
  @Post('')
  @UseGuards(AuthGuard)
  public async create(@Body() task: CreateTaskDTO, @Headers() headers: any) {
    try {
        const taskCreated = await this.createTask.execute(task, headers.user.sub);
        return taskCreated;
    } catch (error) {
        console.log(error)
        throw new HttpException('Falha Ao criar tarefa', 400)
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  public async searchTask(@Headers() headers: any) {
    const tasks = await this.searchTasks.execute(headers.user.sub);

    return tasks;
  }
}
