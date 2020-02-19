import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uid from 'uid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTasks(title: string, description: string) {
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
