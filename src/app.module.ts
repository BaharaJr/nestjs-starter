import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
imports: [ItemsModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
