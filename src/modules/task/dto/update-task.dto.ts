import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @IsEmpty()
  @IsString()
  name?: string;

  @IsEmpty()
  @IsString()
  description?: string;

  @IsEmpty()
  @IsNumber()
  timesToComplete?: number;
}
