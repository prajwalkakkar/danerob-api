import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { ChangeNameDto } from "./dto/change-name.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

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
  findOne(@Query("email") email: string) {
    return this.adminService.findOne(email);
  }

  @Patch("update-admin")
  updateAdmin(
    @Query("email") email: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.updateAdmin(email, updateAdminDto);
  }

  @Get("get-profile")
  findAdminProfile(@Query("email") email: string) {
    return this.adminService.findAdminProfile(email);
  }
}
