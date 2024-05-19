import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { HasRole } from "src/auth/decorator/role.decorator";
import { Role } from "./enum/role.enum";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/auth/guards/role.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { PasswordInterceptor } from "./password.interceptor";


@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @Get('')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async findAll(){
        return await this.userService.findAll()
    }

    @Get(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async findOne(@Param('id') id:string){
        return await this.userService.findById(id);
    }

    @Get(':id/order/')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async findUserOrder(@Param('id') id:string){
        return this.userService.findUserOrder(id)
    }

    
    @Post('')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async create(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto)
    }


    @Put(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async update(@Param('id') id:string , @Body() updateUserDto:UpdateUserDto){
        const result = await this.userService.update(id , updateUserDto);

        if(!result.success){
            throw new BadRequestException(result.message);
        }

        return result
    }



    @Delete(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async remove(@Param('id') id:string){
        const result = await this.userService.remove(id);

        if(!result.success){
            throw new BadRequestException(result.message);
        }

        return result
        
    }


    @Put('password/:id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async changePassword(@Body() changePasswordDto:ChangePasswordDto ,@Param('id') id:string){
        const result = await this.userService.changePassword(changePasswordDto , id);

        if(!result.success){
            throw new BadRequestException(result.message);
        }

        return result
    }

}