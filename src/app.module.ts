import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { getDataBaseConfiguration } from './database/config/baseconfiguration';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(getDataBaseConfiguration()), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
