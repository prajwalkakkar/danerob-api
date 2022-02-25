import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Admin } from "src/admin/entities/admin.entity";
import { getRepository } from "typeorm";

@Injectable()
export class AdminGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		if (!request.headers.authorization) {
			return false;
		}

		request.token = await this.validateToken(request.headers.authorization);
		if (request.token.isAdmin !== true) return false;

		request.admin = getRepository(Admin).findOne({
			email: request.token.email,
		});

		return true;
	}

	async validateToken(auth: string) {
		if (auth.split(" ")[0] !== "Bearer") {
			throw new HttpException("Invalid token", HttpStatus.FORBIDDEN);
		}
		const token = auth.split(" ")[1];
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			return decoded;
		} catch (err) {
			if (err.name == " TokenExpiredError") {
				throw new HttpException(err.name, HttpStatus.NOT_ACCEPTABLE);
			}
			const message = "Token error: " + (err.message || err.name);
			throw new HttpException(message, HttpStatus.FORBIDDEN);
		}
	}
}
