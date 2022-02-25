import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { SaleType } from "src/user/entities/sale-type.enum";

export class CreateSaleDto {
	@ApiProperty({ enum: SaleType })
	@IsNotEmpty()
	@IsEnum(SaleType)
	saleType: SaleType;

	@ApiProperty()
	@IsNotEmpty()
	cliffOpenDate: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	percentage: number;
}
