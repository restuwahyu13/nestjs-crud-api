import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'

@Entity()
export class Book {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: false })
	name: string

	@Column({ nullable: false })
	description: string

	@Column({ nullable: false, unique: true })
	isbn: number

	@Column({ nullable: false, unsigned: true })
	price: number

	@Column({ nullable: false })
	author: string

	@Column({ nullable: false })
	publisher: string

	@Column({ nullable: false })
	release_date: Date

	@Column({ nullable: true })
	created_at: Date

	@Column({ nullable: true })
	updated_at: Date

	@BeforeInsert()
	hooksCreated(): void {
		this.created_at = new Date()
	}

	@BeforeUpdate()
	hooksUpdated(): void {
		this.updated_at = new Date()
	}
}
