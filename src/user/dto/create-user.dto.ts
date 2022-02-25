import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SaleType } from "../entities/sale-type.enum";

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	userAddress: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	userTokenAddress: string;

	@ApiProperty({ enum: SaleType })
	@IsNotEmpty()
	saleType: SaleType;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	amount: number;
}
