import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { User } from '@models/model.user'
import { AuthService } from '@services/auth.service'
import { AuthController } from '@controllers/auth.controller'
import { JwtAuthStrategy } from '@libs/internal/jwt/lib.strategy'
import { LocalAuthStrategy } from '@libs/internal/passport/lib.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { audience: 'nestjs-app' },
			verifyOptions: { audience: 'nestjs-app' }
		})
	],
	exports: [TypeOrmModule, AuthService]
})
export class AuthModule {}
