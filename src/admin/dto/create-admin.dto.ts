import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;
}
