import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { EntityRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasksfilter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './tasks.status-enum';

@EntityRepository(Task)
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(tasksFilterDto: TasksFilterDto, user: any): Promise<any> {
    const { status, search } = tasksFilterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    query.where('task.userId=:userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status=:status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    let tasks = query.getMany();
    return tasks;
  }

  async getTaskById(id: number, user: any): Promise<Task> {
    let found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTasks(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteOneTask(id: number, user: any): Promise<any> {
    let found = await this.taskRepository.delete({id, userId: user.id});
    if (found.affected === 0) {
      throw new NotFoundException(`Can not delete task with ID ${id} `);
    }
    return found;
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    let task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
