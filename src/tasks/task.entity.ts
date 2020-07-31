import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as uid from 'uid';
import { TaskStatus } from './tasks.status-enum';

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

  @Column()
  userId: number;

  @ManyToOne(
    type => User,
    user => user.tasks,
    { eager: false },
  )
  user: User[];

  // @JoinColumn({name: 'userId'})
  // user: User[];

  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = uid(11);
  }
}
