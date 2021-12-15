import { Injectable, UnauthorizedException, HttpStatus as Status } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'
import { PassportStrategy } from '@nestjs/passport'

import { User } from '@models/model.user'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectRepository(User) private readonly model: Repository<User>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET
		})
	}

	async validate(payload: Record<string, any>): Promise<any> {
		const user: User = await this.model.findOne({ where: { id: payload.id, email: payload.email } })
		if (!user) {
			throw new UnauthorizedException({ code: Status.UNAUTHORIZED, message: 'Unauthorized Access Token Expired or Invalid' })
		}

		return user
	}
}
