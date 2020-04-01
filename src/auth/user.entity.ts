import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as uid from 'uid';
import { Task } from 'src/tasks/task.entity';

@Entity('user', { schema: 'public' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uid: string;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  task: Task[];

  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = uid(11);
  }

  async validatePassword(password: string): Promise<boolean> {
    let hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
