import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcryptjs from 'bcryptjs'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: false, unique: true })
	email: string

	@Column({ nullable: false })
	password: string

	@Column({ nullable: true })
	created_at: Date

	@Column({ nullable: true })
	updated_at: Date

	@BeforeInsert()
	async hooksCreated(): Promise<void> {
		const hashPassword: string = await bcryptjs.hash(this.password, bcryptjs.genSaltSync(12))
		this.password = hashPassword
		this.created_at = new Date()
	}

	@BeforeUpdate()
	hooksUpdated(): void {
		this.updated_at = new Date()
	}
}
