import { Injectable } from '@nestjs/common'
import { AuthGuard, PassportModule, PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

export namespace Passport {
	export class LocalAuthGuard extends AuthGuard('local') {}

	@Injectable()
	export class LocalAuthStrategy extends PassportStrategy(Strategy) {
		async validate(username: string, password: string): Promise<any> {
			return { email: username, password }
		}
	}

	export class Module {
		static typeModule = PassportModule
	}
}
