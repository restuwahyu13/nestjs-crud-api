import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy } from 'passport-local'
import { Repository } from 'typeorm'
import { PassportStrategy } from '@nestjs/passport'

import { User } from '@models/model.user'
import { Bcrypt } from '@libs/external/lib.bcryptjs'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectRepository(User) private readonly model: Repository<User>) {
		super()
	}

	async validate(username: string, password: string) {
		const user = await this.model.findOne({ where: { email: username } })
		if (!user) {
			throw new UnauthorizedException()
		}

		const compare = await Bcrypt.comparePassword(password, user.password)
		if (!compare) {
			throw new UnauthorizedException()
		}

		return user
	}
}
