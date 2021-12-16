import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '@modules/auth.module'
import { BookModule } from '@modules/book.module'
import { Typeorm } from '@libs/lib.typeorm'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		Typeorm.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: ['dist/models/*.js'],
			synchronize: true,
			autoLoadEntities: true
		}),
		BookModule,
		AuthModule
	]
})
export class AppModule {}
