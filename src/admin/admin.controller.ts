import { BadRequestException, Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { HasRole } from "src/auth/decorator/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Role } from "src/user/enum/role.enum";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";


@ApiBearerAuth('access-token')
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(
        private readonly userService:UserService
    ){}
    
    @Get('')
    @UseGuards(JwtAuthGuard)
    async me(@Req() req:Request){
        return req.user ; 
    }

    @Put('/password')
    @UseGuards(JwtAuthGuard)
    async updatePassword(@Req() req:Request , @Body() changePassswordDto:ChangePasswordDto){
        const user = req.user as User
        const result = await this.userService.changePassword(changePassswordDto , user.id);

        if(!result.success){
            throw new BadRequestException(result.message);
        }

        return result ; 
    }

}