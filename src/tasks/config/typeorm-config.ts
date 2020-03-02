import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tasks',
  synchronize: false,
  logging: false,
  dropSchema: true,
  entities: ['src/tasks/**/*.entity.ts'],
  migrations: ['src/database/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};
