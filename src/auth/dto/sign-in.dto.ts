import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({type : 'string'})
    @IsNotEmpty()
    usernameOrEmail : string ;


    
    @ApiProperty()
    @IsNotEmpty()
    password : string ; 
}