import bcrypt from 'bcryptjs'

export class Bcrypt {
	static async hashPassword(password: string): Promise<string> {
		const salt: string = await bcrypt.genSalt(12)
		const hashPassword: string = await bcrypt.hash(password, salt)
		return hashPassword
	}

	static async comparePassword(password: string, hashPassword: string): Promise<boolean> {
		const compare: boolean = await bcrypt.compare(password, hashPassword)
		return compare
	}
}
