import { SaleType } from "src/user/entities/sale-type.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "enum", enum: SaleType })
	saleType: SaleType;

	@Column()
	cliffOpenDate: Date;

	@Column()
	percentage: number;
}
