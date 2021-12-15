import { Controller, Get } from '@nestjs/common'
import { AuthService } from '@services/auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	getLogin(): string {
		return this.authService.getLogin()
	}
}
