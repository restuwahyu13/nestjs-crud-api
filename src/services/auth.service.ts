import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@models/model.user'

@Injectable()
export class AuthService {
	constructor(@InjectRepository(User) private readonly model: User) {}

	registerAuth(): string {
		return 'hello wordl'
	}

	loginAuth(): string {
		return 'hello wordl'
	}
}
