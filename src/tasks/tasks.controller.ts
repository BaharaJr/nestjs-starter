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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTask } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';
import { TaskStatusValidation } from './pipes/task-status.validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(@Query(ValidationPipe) filterTask: TasksFilterDto): Task[] {
    if (Object.keys(filterTask).length) {
      return this.taskService.getFilteredTask(filterTask);
    } else return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTask: CreateTask): Task {
    console.log(createTask);
    return this.taskService.createTasks(createTask);
  }

  @Delete('/:id')
  deleteOneTask(@Param('id') id: string) {
    return this.taskService.deleteOneTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidation) status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
