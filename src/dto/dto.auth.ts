import { IsNotEmpty, IsEmail, MinLength } from 'class-validator'

export class DTORegister {
	@IsNotEmpty({ message: 'email is required' })
	@IsEmail()
	email: string

	@IsNotEmpty({ message: 'password is required' })
	@MinLength(8)
	password: string
}

export class DTOLogin {
	@IsNotEmpty({ message: 'email is required' })
	@IsEmail()
	email: string

	@IsNotEmpty({ message: 'password is required' })
	@MinLength(8)
	password: string
}
