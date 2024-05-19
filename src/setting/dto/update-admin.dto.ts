import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsOptional } from "class-validator";

export class UpdateAdminDto {
    @ApiProperty()
    @IsOptional()
    avatar:string;

    @ApiProperty()
    @IsOptional()
    first_name : string ; 
    
    @ApiProperty() 
    @IsOptional()
    last_name : string ; 

    @ApiProperty() 
    @IsOptional()
    phone_number : string;

    @ApiProperty()
    @IsOptional()
    home_phone_number : string;
   
    @ApiProperty()
    @IsOptional()
    address : string ;

    @ApiProperty()
    @IsOptional()
    country : string ;
    
    @ApiProperty()
    @IsOptional()
    city : string ; 
    
    @ApiProperty()
    @IsOptional()
    postal_code: string ;

    @ApiProperty()
    @IsOptional()
    note : string ; 

    @ApiProperty()
    @IsOptional()
    username : string ;

    @ApiProperty()
    @IsOptional()
    email : string ; 
}