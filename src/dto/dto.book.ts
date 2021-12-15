import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, IsNumber, IsDate, IsInt, MinLength } from 'class-validator'

export class DTOBook {
	@IsNotEmpty({ message: 'book name is required' })
	@IsString()
	name: string

	@IsNotEmpty({ message: 'book name is required' })
	@IsString()
	description: string

	@IsNotEmpty({ message: 'isbn is required' })
	@IsNumber()
	@MinLength(8)
	isbn: number

	@IsNotEmpty({ message: 'price is required' })
	@IsNumber()
	price: number

	@IsNotEmpty({ message: 'author name is required' })
	@IsString()
	author: string

	@IsNotEmpty({ message: 'publisher name is required' })
	@IsString()
	publisher: string

	@IsNotEmpty({ message: 'book release_date is required' })
	@Type(() => Date)
	@IsDate()
	release_date: Date
}

export class DTOBookById {
	@IsNotEmpty({ message: 'id is required' })
	@Type(() => Number)
	@IsInt()
	id: number
}
