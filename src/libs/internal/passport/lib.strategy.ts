import { Injectable } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
	async validate(username: string, password: string): Promise<any> {
		return { email: username, password }
	}
}
