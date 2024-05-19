import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, NotFoundException, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { HasRole } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/user/enum/role.enum';
import { RemoveProductDto } from './dto/remove-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Category')
@ApiBearerAuth('access-token')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.categoryService.create(createCategoryDto);

    if(!result.success){
      throw new BadRequestException(result.message);
    }

    return result
  }

  @Get() 
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne({id});
  }

  @Put(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async update(
    @Param('id')    id: string, 
    @Body()         updateCategoryDto: UpdateCategoryDto , 
  ) {
    const result = await this.categoryService.update(id, updateCategoryDto);

    if(!result.success){
        throw new BadRequestException(result.message);
    }

    return result
  }


  @Delete(':id/removeProduct')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async removeProduct(@Body() removeProductDto:RemoveProductDto , @Param('id') id: string) {
    const { productId } = removeProductDto
    const result = await this.categoryService.removeProduct(productId , id);

      if(!result.success){
        throw new BadRequestException(result.message);
    }

    return result
  }


  @Delete(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async remove(@Param('id') id: string) {
    const result = await this.categoryService.remove(id);

      if(!result.success){
        throw new BadRequestException(result.message);
    }

    return result
  }
}
