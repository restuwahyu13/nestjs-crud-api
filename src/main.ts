import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from '@/app.module'

// initialize nestjs application
;(async function () {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(new ValidationPipe())
	app.enableCors()
	app.disable()

	await app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))
})()
