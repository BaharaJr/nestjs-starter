import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tasks',
  synchronize: true,
  logging: false,
  dropSchema: true,
  entities: [__dirname + '/../**/*.entity.ts'],
  migrations: ['src/database/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};
