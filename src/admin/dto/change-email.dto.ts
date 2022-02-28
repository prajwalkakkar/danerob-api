import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangeEmailDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	newEmail: string;
}
