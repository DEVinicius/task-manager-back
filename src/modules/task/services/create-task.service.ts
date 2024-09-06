import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/create-task.dto';

@Injectable()
export class CreateTask {
  constructor() {}

  public async execute(data: CreateTaskDTO) {
    
  }
}
