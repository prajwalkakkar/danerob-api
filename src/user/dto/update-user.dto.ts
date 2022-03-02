import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto{
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	userTransaction:string

    @ApiProperty()
	@IsNotEmpty()
	lastClaimDate:Date
}