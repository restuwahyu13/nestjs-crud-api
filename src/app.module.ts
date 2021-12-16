import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { Typeorm } from '@libs/lib.typeorm'
import { ElasticSeach } from '@libs/lib.elasticsearch'
import { Redis } from '@libs/lib.redis'
import { AuthModule } from '@modules/auth.module'
import { BookModule } from '@modules/book.module'

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
		ElasticSeach.register({
			node: [
				`${process.env.ELK_HOST}:${process.env.ELK_PORT_1}`,
				`${process.env.ELK_HOST}:${process.env.ELK_PORT_2}`,
				`${process.env.ELK_HOST}:${process.env.ELK_PORT_3}`
			]
		}),
		Redis.register({
			host: process.env.REDIS_HOST,
			port: +process.env.REDIS_PORT,
			enableReadyCheck: true,
			enableAutoPipelining: true
		}),
		AuthModule,
		BookModule
	]
})
export class AppModule {}
