import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(type => User, user => user.tasks, {eager: false})
  user: User[]

  @JoinColumn({name: 'userId'})
  userId: number;

  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = uid(11);
  }
}
