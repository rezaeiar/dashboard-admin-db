import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponSchedulerService } from './coupon-scheduler.service';

@Module({
  imports : [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService , CouponSchedulerService ],
})
export class CouponModule {}
