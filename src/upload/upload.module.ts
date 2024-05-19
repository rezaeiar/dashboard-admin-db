import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";


@Module({
    controllers : [UploadController],
    imports : [ConfigModule] ,
    providers : [UploadService] , 
    exports : [UploadService]
})
export class UploadModule {}