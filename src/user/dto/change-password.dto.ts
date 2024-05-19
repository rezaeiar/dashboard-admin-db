import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    password : string ; 

    @ApiProperty()
    @IsNotEmpty()
    currentPassword : string ; 
}