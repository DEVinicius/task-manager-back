import { Body, Controller, Header, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/guard/auth.guard';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('task')
@UseGuards()
export class TaskController {
  @Post('')
  @UseGuards(AuthGuard)
  public async create(@Body() task: CreateTaskDTO) {}
}
