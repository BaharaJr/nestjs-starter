import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './tasks/config/typeorm-config';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
