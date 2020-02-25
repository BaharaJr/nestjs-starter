import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './tasks/config/typeorm-config';

@Module({
imports: [ItemsModule, TasksModule, TypeOrmModule.forRoot(typeormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
