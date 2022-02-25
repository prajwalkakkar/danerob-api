import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { SaleService } from "./sale.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/guards/admin.guard";

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
}
