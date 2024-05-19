import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsOptional()
    images:string[]

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name : string ; 
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description : string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price : number; 
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    count : number;

    @ApiProperty()
    @IsNotEmpty()
    tags : string[];

    @ApiProperty()
    @IsNotEmpty()
    weight: string ; 

    @ApiProperty()
    @IsNotEmpty()
    isDigital :boolean ; 

    @ApiProperty()
    @IsNotEmpty()
    country :string ; 

    @ApiProperty({required : false})
    @IsOptional()
    categoryId: string;
}
