import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./admin/admin.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { SaleModule } from './sale/sale.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
		AdminModule,
		DatabaseModule,
		UserModule,
		SaleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
