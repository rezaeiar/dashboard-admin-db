import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @ApiProperty()
    name : string ; 
}
