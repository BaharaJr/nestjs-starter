import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { TaskStatus } from './tasks.status-enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
