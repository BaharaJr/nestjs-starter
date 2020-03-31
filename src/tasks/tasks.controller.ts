import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';
import { TaskStatusValidation } from './pipes/task-status.validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getTasks(@Query(ValidationPipe) tasksFilterDto: TasksFilterDto): Promise<any> {
   return this.taskService.getAllTasks(tasksFilterDto)
  }

  @Get('/:id')
   getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTasks(createTaskDto);
  }

  @Delete('/:id')
  deleteOneTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteOneTask(id);
  }

  @Patch('/:id/status')
 async updateTaskStatus(
    @Param('id') id: number,
    @Body('status', TaskStatusValidation) status: TaskStatus,
  ): Promise<Task> {
    return await this.taskService.updateTaskStatus(id, status);
  }
}
