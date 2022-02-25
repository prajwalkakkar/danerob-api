import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { Sale } from "./entities/sale.entity";

@Injectable()
export class SaleService {
	constructor(
		@InjectRepository(Sale) private saleRepository: Repository<Sale>
	) {}
	async create(createSaleDto: CreateSaleDto) {
		try {
			const sale = this.saleRepository.create(createSaleDto);
			await this.saleRepository.save(sale);
			return sale;
		} catch (err) {
			console.log("Error at creating sale", err);
			throw new InternalServerErrorException();
		}
	}

	async findAll() {
		return await this.saleRepository.find();
	}
}
