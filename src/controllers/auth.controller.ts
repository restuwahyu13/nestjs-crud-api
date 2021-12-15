import { OutgoingMessage } from 'http'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthService } from '@services/auth.service'
import { DTOLogin, DTORegister } from '@dto/dto.auth'

@Controller('api/v1/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async registerAuth(@Res() res: Response, @Body() body: DTORegister): Promise<OutgoingMessage> {
		try {
			const service = this.authService.registerAuth()
			return res.status(200).json({ message: body })
		} catch (e) {
			return res.status(400).json(e)
		}
	}

	@Post('login')
	async loginAuth(@Res() res: Response, @Body() body: DTOLogin): Promise<OutgoingMessage> {
		try {
			const service = this.authService.loginAuth()
			return res.status(200).json({ message: body })
		} catch (e) {
			return res.status(400).json(e)
		}
	}
}
