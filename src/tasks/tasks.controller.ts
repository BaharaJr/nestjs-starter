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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';
import { TaskStatusValidation } from './pipes/task-status.validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  @UseGuards(AuthGuard())
  async getTasks(
    @Query(ValidationPipe) tasksFilterDto: TasksFilterDto,
  ): Promise<any> {
    return this.taskService.getAllTasks(tasksFilterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTasks(createTaskDto, user);
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
