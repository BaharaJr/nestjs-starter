import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
} from 'typeorm';
import { TaskStatus } from './tasks.status-enum';
import * as uid from 'uid';

@Entity('task', { schema: 'public' })
export class Task extends BaseEntity {
  static plural = 'users';
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = uid(11);
  }
}
