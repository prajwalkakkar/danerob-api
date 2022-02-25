import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		TypeOrmModule.forFeature([Admin]),
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: "24h",
			},
		}),
	],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
