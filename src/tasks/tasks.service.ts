import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from './tasks.status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { createQueryBuilder, EntityRepository } from 'typeorm';

@EntityRepository(Task)
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

 async getAllTasks(tasksFilterDto: TasksFilterDto): Promise<any> {
    const {status, search} = tasksFilterDto;
    const query = this.taskRepository.createQueryBuilder('task')
    if(status){
      query.andWhere('task.status=:status', {status})
    }
    if(search){
      
    }
    let tasks = query.getMany();
    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    let found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async deleteOneTask(id: number): Promise<any> {
    let found = await this.taskRepository.delete(id);
    if (found.affected === 0) {
      throw new NotFoundException(`Can not delete task with ID ${id} `);
    }
    return found;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    let task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   let task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
