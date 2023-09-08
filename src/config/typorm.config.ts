import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ht3aa',
  database: 'postgres',
  schema: 'public',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
