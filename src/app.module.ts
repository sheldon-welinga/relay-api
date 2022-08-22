import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormModuleConfig } from 'src/config/typeorm.config';
import AppDataSource from 'src/config/datasource.config';
import { graphQLConfig } from 'src/config/graphql.config';
import { modules } from 'src/modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormModuleConfig,
      dataSourceFactory: () => AppDataSource.initialize(),
    }),
    ...modules,
    GraphQLModule.forRoot({
      ...graphQLConfig,
      playground: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
