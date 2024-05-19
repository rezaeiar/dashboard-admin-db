import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email : string ; 


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title : string ;



    @ApiProperty()
    @IsNotEmpty()
    expire_time : Date;
}