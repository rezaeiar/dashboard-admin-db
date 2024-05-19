import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    CategoryModule ,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports : [ProductService]
})
export class ProductModule {}