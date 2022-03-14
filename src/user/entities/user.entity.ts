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

	@Column({nullable:true})
	totalAmount: number;

	@Column({ type: "enum", enum: SaleType })
	saleType: SaleType;

	@Column({ nullable: true })
	remaningClaim?: number;

	@Column({nullable:true})
	seed:string	

	@Column({nullable:true})
	claimDate:Date

	@Column({nullable:true})
	lastClaimDate:Date
	
	@Column({nullable:true})
	userTransaction:string
	
	@Column({nullable:true})
	transaction:string

}
