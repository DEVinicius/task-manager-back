import { Module } from '@nestjs/common';
import { TaskLogDI } from './repository/__token__';
import { FindMarksTodayService } from './services/find-marks-today.service';
import { TaskLogController } from './task-log.controller';
import { TaskModule } from '../task/task.module';
import { UpdateTaskToDoneService } from './services/update-task-to-done.service';

@Module({
  providers: [TaskLogDI, FindMarksTodayService, UpdateTaskToDoneService],
  controllers: [TaskLogController],
  imports: [TaskModule],
})
export class TaskLogModule {}
