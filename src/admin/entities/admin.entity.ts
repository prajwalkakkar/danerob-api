import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
@Unique(["email"])
export class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@BeforeInsert()
	private hashPassword = () => {
		this.password = bcrypt.hashSync(this.password, 12);
	};

	@BeforeUpdate()
	private hashPass?() {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
