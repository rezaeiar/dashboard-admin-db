import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./config/database.module";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { ManagerModule } from "./manager/manager.module";
import { TaskModule } from './task/task.module';
import { SettingModule } from './setting/setting.module';
import { UploadModule } from "./upload/upload.module";
import { ScheduleModule } from "@nestjs/schedule";


@Module({
    imports : [
        ConfigModule.forRoot({isGlobal : true}) ,
        ScheduleModule.forRoot() ,
        DatabaseModule,
        UserModule,
        AuthModule,
        EmailModule,
        AdminModule,
        CategoryModule ,
        ProductModule,
        OrderModule,
        CouponModule , 
        ManagerModule, 
        TaskModule, 
        SettingModule , 
        UploadModule
    ],
    controllers : [],
    exports : []
})
export class AppModule {}