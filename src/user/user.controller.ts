import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Patch,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/guards/admin.guard";
import { UpdateUserDto } from "./dto/update-user.dto";

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

  @Get("user-by-address")
  findUserByAddress(@Query("address") userAddress: string) {
    return this.userService.getUserByAddress(userAddress);
  }

  @Patch("update-user")
  updateUser(
    @Query("seed") seed: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(seed, updateUserDto);
  }

  @Get("usersCount")
  findUsersCount() {
    return this.userService.getUserCount();
  }
}
