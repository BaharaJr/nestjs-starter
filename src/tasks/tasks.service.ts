import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status-enum';
import * as uid from 'uid';
import { CreateTask } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // getAllTasks() {
  //   return this.tasks;
  // }

  // getFilteredTask(tasksfilter: TasksFilterDto) {
  //   const { status, search } = tasksfilter;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }
  async getTaskById(id: number): Promise<Task> {
    let found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find(task => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException();
  //   } else return found;
  // }

  async createTasks(createTask: CreateTask): Promise<Task> {
    const { title, description } = createTask;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.uid = uid();
    await task.save();
    return task;
  }

  // createTasks(createTask: CreateTask) {
  //   const { title, description } = createTask;
  //   const task: Task = {
  //     id: uid(),
  //     title,
  //     description,
  //     status: TaskStatus.DONE,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteOneTask(id: string): void {
  //   let found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   let task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
