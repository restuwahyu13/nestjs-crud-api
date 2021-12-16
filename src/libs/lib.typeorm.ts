import { TypeOrmModule } from '@nestjs/typeorm'

export class Typeorm {
	static typeModule = TypeOrmModule
	static forFeature = TypeOrmModule.forFeature
	static forRoot = TypeOrmModule.forRoot
}
