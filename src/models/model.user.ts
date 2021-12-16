import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { IAuth } from '@interfaces/interface.auth'
import { Bcrypt } from '@/libs/lib.bcryptjs'

@Entity()
export class User implements IAuth {
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
		const hashPassword: string = await Bcrypt.hashPassword(this.password)
		this.password = hashPassword
		this.created_at = new Date()
	}

	@BeforeUpdate()
	hooksUpdated(): void {
		this.updated_at = new Date()
	}
}
