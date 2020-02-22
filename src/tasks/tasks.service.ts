import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uid from 'uid';
import { CreateTask } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getFilteredTask(tasksfilter: TasksFilterDto) {
    const { status, search } = tasksfilter;
    let taskz = this.getAllTasks();

    if (status) {
      taskz = taskz.filter(task => task.status === status);
    }
    if (search) {
      taskz = taskz.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return taskz;
  }
  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
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

  deleteOneTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
