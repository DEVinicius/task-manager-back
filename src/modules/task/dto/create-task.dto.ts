import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  timesToComplete: number;
}
