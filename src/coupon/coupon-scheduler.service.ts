import { Injectable } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class CouponSchedulerService {
    constructor(
        private readonly couponService:CouponService , 
    ){}

    @Cron('0 */40 * * * *')
    async updateCouponStatuses(){
        console.log('Updating coupon statuses...');
        await this.couponService.updateExpiredCoupon();
    }
}