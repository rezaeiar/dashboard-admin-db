import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty()
    @IsString()
    password : string ; 


    @ApiProperty()
    @IsString()
    currentPassword : string ; 
}