import { Controller, Get, Post, Body, UseGuards, Query } from "@nestjs/common";
import { SaleService } from "./sale.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/guards/admin.guard";

import { SaleType } from "src/user/entities/sale-type.enum";

@ApiTags("sale")
@Controller("sale")
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  // @UseGuards(AdminGuard)
  // @ApiBearerAuth()
  @Post("create-sale")
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get("get-all")
  findAll() {
    return this.saleService.findAll();
  }

  // @UseGuards(AdminGuard)
  // @ApiBearerAuth()
  @Get("get-saleByTpe")
  findSaleByType(@Query("saleType") saleType: SaleType) {
    return this.saleService.getSaleByType(saleType);
  }

  @Get("get-saleCount")
  findSaleCount() {
    return this.saleService.getSaleCount();
  }
}
