import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskStatusValidation } from './pipes/task-status.validation.pipe';
import { TaskStatus } from './tasks.status-enum';
import { Logger } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private taskService: TasksService) {}
  @Get()
  @UseGuards(AuthGuard())
  async getTasks(
    @Query(ValidationPipe) tasksFilterDto: TasksFilterDto,
    @GetUser() user: User,
  ): Promise<any> {
    this.logger.verbose(
      `'${user.username}' retrieving all tasks. Filter: ${JSON.stringify(
        tasksFilterDto,
      )}`,
    );
    return this.taskService.getAllTasks(tasksFilterDto, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getTaskById(@Param('id') id: number, @GetUser() user: any): Promise<Task> {
    return this.taskService.getTaskById(id, user);
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
  @UseGuards(AuthGuard())
  deleteOneTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.taskService.deleteOneTask(id, user);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  async updateTaskStatus(
    @Param('id') id: number,
    @Body('status', TaskStatusValidation) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskService.updateTaskStatus(id, status, user);
  }
}
