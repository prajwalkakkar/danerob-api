import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) {}
	async create(createUserDto: CreateUserDto) {
		try {
			const user = this.userRepository.create(createUserDto);
			await this.userRepository.save(user);
			return user;
		} catch (err) {
			console.log("Error at creating user", err);
			throw new InternalServerErrorException();
		}
	}

	async findAll() {
		return await this.userRepository.find();
	}
}
