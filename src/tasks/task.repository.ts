import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.status-enum';
import * as uid from 'uid';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTask: CreateTaskDto, user: any): Promise<Task> {
    const { title, description } = createTask;
    const task = new Task();
    // Object.keys(createTask).forEach(key => {
    //   task[key] = createTask[key];
    // });
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    if (user) {
      await task.save();
    } else {
      throw new BadRequestException('User can never be null');
    }
    delete task.user;
    return task;
  }
}
