import {
  Controller,
  Get,
  Headers,
  HttpException,
  Injectable,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FindMarksTodayService } from './services/find-marks-today.service';
import { AuthGuard } from '../user/guard/auth.guard';
import { UpdateTaskToDoneService } from './services/update-task-to-done.service';

@Controller('task-log')
@Injectable()
export class TaskLogController {
  constructor(
    private readonly findMarksTodayService: FindMarksTodayService,
    private readonly updateTaskToDoneService: UpdateTaskToDoneService,
  ) {}

  @Get('')
  @UseGuards(AuthGuard)
  public async findMarksToday(@Headers() headers: any) {
    try {
      const marks = await this.findMarksTodayService.execute(headers.user.sub);
      return marks;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  public async updateToDone(@Param('id') id: string, @Headers() headers: any) {
    try {
      const marks = await this.updateTaskToDoneService.execute(Number(id));
      return marks;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
