import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SaleType } from "./sale-type.enum";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userAddress: string;

	@Column()
	userTokenAddress: string;

	@Column()
	amount: number;

	@Column({ type: "enum", enum: SaleType })
	saleType: SaleType;

	@Column({ nullable: true })
	lastClaimedDate?: Date;

	@Column({ nullable: true })
	remaningClaim?: number;
}
