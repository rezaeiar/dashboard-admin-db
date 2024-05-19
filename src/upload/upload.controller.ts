import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Role } from "src/user/enum/role.enum";
import { HasRole } from "src/auth/decorator/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { FileTypeValidationPipe } from "./pipes/file-type-validation.pipe";


@ApiTags('Upload')
@ApiBearerAuth('access-token')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService:UploadService){}

    @Post()
    @ApiBody({
        required: false,
        type: "multipart/form-data",
        schema: {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary",
            },
          },
        },
    })
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('file'))
    @HasRole(Role.ADMIN)
    @UseGuards(JwtAuthGuard , RolesGuard)
    async upload(@UploadedFile(new FileTypeValidationPipe()) file:Express.Multer.File){
        const {url} = await this.uploadService.uploadFile(file)
        return {url}
    }
}