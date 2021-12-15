import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { AuthModule } from '@modules/auth.module'
import { BookModule } from '@modules/book.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot({
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
export class AppModule {
	constructor(private connection: Connection) {}
}
