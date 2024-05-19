import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindOptionsWhere, QueryFailedError, Repository } from 'typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';
import { UploadService } from 'src/upload/upload.service';

type Where = FindOptionsWhere<Category>

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo:Repository<Category> ,
    private readonly uploadService:UploadService ,
  ){}

  async create(createCategoryDto: CreateCategoryDto ,):Promise<StatusResult>{
    const {name } = createCategoryDto ;
    const statusResult:StatusResult = {
      message : "Itam created successfully",
      success : true , 
    }

    try {
      const category = await this.categoryRepo.findOne({where : {name}});
      if(category) throw new BadRequestException('category alredy exist');

      const newCategory = new Category()
      newCategory.name = name ; 

      const savedCategory = await this.categoryRepo.save(newCategory);

      statusResult.Id = savedCategory.id 
    } catch (error) {
      return {
        message : error.message , 
        success : false
      }
    }

    return statusResult ;
  }

  async findAll():Promise<Category[]>{
    return await this.categoryRepo.find({relations : {products : true}})
  }

  async findOne(where:Where):Promise<Category>{
    const category = await this.categoryRepo.findOne({ where , relations : { products : true}})

    if(!category){
      throw new NotFoundException('category is not found');
    }

    return category ; 
  }

  async update(
    id:string , 
    updateCategoryDto:UpdateCategoryDto , 
  ):Promise<StatusResult>{
    
    const { name , image } = updateCategoryDto ;
    const statusResult:StatusResult = {
      message : 'Category edited successfully' , 
      success :  true , 
    }

    try {
      const category = await this.findOne({id});
      category.name = name ;
      category.image = image ;
      await this.categoryRepo.save(category);
    } catch (error) {
      return {
        message : error.message , 
        success : false
      }
    }
    return statusResult ; 
  }

  async removeProduct(productId:string , categoryId:string):Promise<StatusResult>{
    const statusResult:StatusResult = {
      message : 'product removed successfully' , 
      success : true , 
    }
    try {
      const category = await this.findOne({id:categoryId})
      category.products = category.products.filter(product => product.id !== productId);
      await this.categoryRepo.save(category);
    } catch (error) {
      return {
        message : error.message , 
        success : false 
      }
    }

    return statusResult ;
  }

  async remove(id: string):Promise<StatusResult>{
    try {
      await this.findOne({id})
      await this.categoryRepo.delete({id})
    } catch (error) {
      if(error instanceof QueryFailedError){
        const category = await this.findOne({id});
        category.products = [];
        await this.categoryRepo.save(category);
        await this.categoryRepo.delete(id);
      }else {
        return {
          message : error.message ,
          success : false ,
        }
      }
    }

    return {
      message : 'item removed successfully' , 
      success : true ,
    }
  }
}
