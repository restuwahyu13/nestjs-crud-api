import { ConfigModule } from '@nestjs/config'

export class Dotenv {
	static typeModule = ConfigModule
	static forRoot = ConfigModule.forRoot
}
