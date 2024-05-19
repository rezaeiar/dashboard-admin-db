import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateProductDto {
    @ApiProperty()
    @IsOptional()
    @IsArray()
    images:string[]

    @ApiProperty()
    @IsOptional()
    name : string ;
   
    @ApiProperty()
    @IsOptional()
    description : string ; 
    
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price : number ; 

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    count : number ;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    tags : string[]

    @ApiProperty()
    @IsOptional()
    weight: string ; 

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isDigital :boolean ; 

    @ApiProperty()
    @IsOptional()
    country :string ; 

    @ApiProperty()
    @IsOptional()
    categoryId?: string;
}
