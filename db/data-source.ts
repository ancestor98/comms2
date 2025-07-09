import { DataSource, DataSourceOptions } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import{config} from 'dotenv'
import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

config()

export const dataSourceOption:DataSourceOptions={

   
 type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'neondb_owner',
  password: "npg_jQ21TNsadGhR",
  database: 'neondb',
  entities: [UserEntity,CategoryEntity,ProductEntity] ,//[__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, // Required for Neon SSL connections
  },
  


}


const dataSource= new DataSource(dataSourceOption)
export default dataSource