import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.status-enum';
import * as uid from 'uid';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTask: CreateTaskDto) {
    const { title, description } = createTask;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.uid = uid();
    await task.save();

    return task;
  }
}
