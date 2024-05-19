import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name : string ; 
    
    @ApiProperty()
    @IsNotEmpty()
    last_name : string ; 
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string ;
    
    @ApiProperty()
    @IsNotEmpty()
    username : string ; 
    
    @ApiProperty()
    @IsString()
    @MinLength(4)
    password : string ;
}