import { Module } from '@nestjs/common'

import { User } from '@models/model.user'
import { AuthService } from '@services/auth.service'
import { AuthController } from '@controllers/auth.controller'
import { JsonWebToken } from '@libs/lib.jwt'
import { Passport } from '@libs/lib.passport'
import { Typeorm } from '@libs/lib.typeorm'

@Module({
	controllers: [AuthController],
	providers: [AuthService, Passport.LocalAuthStrategy, JsonWebToken.JwtAuthStrategy],
	imports: [
		Typeorm.forFeature([User]),
		Passport.Module,
		JsonWebToken.Module.register({
			secret: process.env.JWT_SECRET,
			signOptions: { audience: 'nestjs-app' },
			verifyOptions: { audience: 'nestjs-app' }
		})
	],
	exports: [Typeorm.typeModule, AuthService]
})
export class AuthModule {}
