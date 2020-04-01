import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from './tasks.status-enum';
import * as uid from 'uid';
import { User } from 'src/auth/user.entity';

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

  @ManyToOne(type => User, user => user.task)
  user: User[]

  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = uid(11);
  }
}
