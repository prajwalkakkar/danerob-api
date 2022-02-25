import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post("register")
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto);
	}

	@Post("login")
	loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
		return this.adminService.login(loginAdminDto);
	}

	@Get("get-one")
	findOne(@Param("email") email: string) {
		return this.adminService.findOne(email);
	}

	@Patch("update-password")
	update(
		@Param("email") email: string,
		@Body() changePasswordDto: ChangePasswordDto
	) {
		return this.adminService.changePassword(email, changePasswordDto);
	}
}
