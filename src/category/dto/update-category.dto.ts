import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCategoryDto {
    @ApiProperty()
    @IsOptional()
    name : string ; 

    @ApiProperty()
    @IsOptional()
    image : string ; 
}