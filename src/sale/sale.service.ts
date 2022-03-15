import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { Sale } from "./entities/sale.entity";

import { SaleType } from "src/user/entities/sale-type.enum";

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

  async getSaleByType(saleType: SaleType) {
    const sales = await this.saleRepository.find({ where: { saleType } });

    if (!sales) throw new NotFoundException();

    return sales;
  }
}
