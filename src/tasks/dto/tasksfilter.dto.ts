import { TaskStatus } from '../tasks.status-enum';
import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class TasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}
