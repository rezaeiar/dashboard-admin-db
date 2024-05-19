import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports:[
    UploadModule ,
    TypeOrmModule.forFeature([Category]),
  ] ,
  controllers: [CategoryController],
  providers: [CategoryService],
  exports : [CategoryService]
})
export class CategoryModule {}