import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/guards/admin.guard";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AdminGuard)
  // @ApiBearerAuth()
  @Post("create-user")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AdminGuard)
  // @ApiBearerAuth()
  @Get("get-all")
  findAll() {
    return this.userService.findAll();
  }
}
