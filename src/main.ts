import 'express-async-errors'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import zlib from 'zlib'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

import { AppModule } from '@/app.module'

// boostraping nestjs application
;(async function () {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(new ValidationPipe())
	app.enableCors()
	app.disable()
	app.use(helmet({ contentSecurityPolicy: false }))
	app.use(
		compression({
			level: zlib.constants.Z_BEST_COMPRESSION,
			memLevel: zlib.constants.Z_BEST_COMPRESSION,
			strategy: zlib.constants.Z_RLE
		})
	)
	if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

	await app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))
})()
