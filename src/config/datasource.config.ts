import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/lib/entities/*.entity.{js,ts}'],
  migrations: ['dist/lib/migrations/*.entity.{js,ts}'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
});

export default AppDataSource;
