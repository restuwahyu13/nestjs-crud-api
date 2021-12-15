import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
	getLogin(): string {
		return 'hello wordl'
	}
}
