import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uid from 'uid';
import { CreateTask } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTasks(createTask: CreateTask) {
    const { title, description } = createTask;
    const task: Task = {
      id: uid(),
      title,
      description,
      status: TaskStatus.DONE,
    };

    this.tasks.push(task);
    return task;
  }
}
