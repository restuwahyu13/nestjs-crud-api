import { OutgoingMessage } from 'http'
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'

import { AuthService } from '@services/auth.service'
import { LocalAuthGuard } from '@libs/internal/passport/lib.guard'
import { DTORegister } from '@dto/dto.auth'

@Controller('api/v1/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async registerAuth(@Res() res: Response, @Body() body: DTORegister): Promise<OutgoingMessage> {
		try {
			const service: Record<string, any> = await this.authService.registerAuth(body)
			return res.status(service.code).json(service)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async loginAuth(@Res() res: Response, @Req() req: Request): Promise<OutgoingMessage> {
		try {
			const service: Record<string, any> = await this.authService.loginAuth(req)
			return res.status(service.code).json(service)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}
}
