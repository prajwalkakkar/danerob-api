import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { JwtPayload } from "./interface/jwt-payload.interface";
import * as bcrypt from "bcrypt";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwtService: JwtService
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    try {
      const admin = this.adminRepository.create(createAdminDto);
      await this.adminRepository.save(admin);
      return admin;
    } catch (err) {
      console.log("Error creating admin", err);
      throw new InternalServerErrorException();
    }
  }

  async findOne(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new NotFoundException();
    return admin;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
  async validateUserPassword(email: string, password: string) {
    const admin = await this.findOne(email);

    if (!admin)
      throw new HttpException(
        "Email or Password is incorrect",
        HttpStatus.NOT_FOUND
      );

    const passIsCorrect = await this.checkPassword(password, admin.password);
    if (admin && passIsCorrect) return admin;
    else
      throw new HttpException(
        "Username or password incorrect",
        HttpStatus.BAD_REQUEST
      );
  }

  private async checkPassword(
    pass: string,
    hashedPass: string
  ): Promise<boolean> {
    const isPassMatch = await bcrypt.compare(pass, hashedPass);
    if (!isPassMatch) return false;
    return true;
  }

  async login(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;
    const result = await this.validateUserPassword(email, password);
    const payload: JwtPayload = { email: result.email, isAdmin: true };
    console.log("payload", payload);
    const accessToken = this.jwtService.sign(payload);
    console.log("access token", accessToken);
    return { code: 200, accessToken };
  }

  async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
    const { newPassword } = changePasswordDto;
    const admin = await this.findOne(email);
    if (!admin) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    admin.password = newPassword;
    await this.adminRepository.save(admin);
    return { code: 201, message: "Password updated" };
  }
}
