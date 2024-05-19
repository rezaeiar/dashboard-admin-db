import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { OrderStatus } from "../enum/order-status.enum";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateOrderStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status:OrderStatus ;
}