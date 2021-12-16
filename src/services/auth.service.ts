import { Injectable, HttpStatus as Status } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

import { User } from '@models/model.user'
import { DTORegister } from '@dto/dto.auth'
import { Bcrypt } from '@libs/lib.bcryptjs'

@Injectable()
export class AuthService {
	constructor(@InjectRepository(User) private readonly model: Repository<User>, private readonly jwt: JwtService) {}

	async registerAuth(body: DTORegister): Promise<any> {
		try {
			const checkUser: User = await this.model.findOne({ where: { email: body.email } })
			if (checkUser) {
				throw { code: Status.CONFLICT, message: 'Email already taken' }
			}

			const hashPassword = await Bcrypt.hashPassword(body.password)
			body.password = hashPassword

			const createNewUser = await this.model.insert({ ...body, created_at: new Date() })
			if (!createNewUser) {
				throw { code: Status.FORBIDDEN, message: 'Create new user account failed' }
			}

			return Promise.resolve({ code: Status.CREATED, message: 'Create new user account success' })
		} catch (e: any) {
			console.error(e)
			return Promise.reject({ code: e.code || Status.INTERNAL_SERVER_ERROR, message: e.message })
		}
	}

	async loginAuth(req: Request): Promise<any> {
		try {
			const user: User = await this.model.findOne({ where: { email: req.user['email'] } })
			if (!user) {
				throw { code: Status.NOT_FOUND, message: 'Email is not never registered' }
			}

			const compare: boolean = await Bcrypt.comparePassword(req.user['password'], user.password)
			if (!compare) {
				throw { code: Status.BAD_REQUEST, message: 'Email or Password is wrong' }
			}

			const accessToken: string = await this.jwt.signAsync(
				{ id: user.id, email: user.email },
				{ secret: process.env.JWT_SECRET, expiresIn: '1d' }
			)

			return Promise.resolve({ code: Status.OK, message: 'Login success', accessToken })
		} catch (e: any) {
			console.error(e)
			return Promise.reject({ code: e.code || Status.INTERNAL_SERVER_ERROR, message: e.message })
		}
	}
}
