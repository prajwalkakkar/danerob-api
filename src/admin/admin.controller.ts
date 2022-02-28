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

  @Patch("update-password")
  updatePass(
    @Query("email") email: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.adminService.changePassword(email, changePasswordDto);
  }

  @Patch("update-name")
  updateName(
    @Query("email") email: string,
    @Body() changeNameDto: ChangeNameDto
  ) {
    return this.adminService.changeName(email, changeNameDto);
  }

  @Patch("update-email")
  updateEmail(
    @Query("email") email: string,
    @Body() changeEmailDto: ChangeEmailDto
  ) {
    return this.adminService.changeEmail(email, changeEmailDto);
  }

  @Get("get-profile")
  findAdminProfile(@Query("email") email: string) {
    return this.adminService.findAdminProfile(email);
  }
}
