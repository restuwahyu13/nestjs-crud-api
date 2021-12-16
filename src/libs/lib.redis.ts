import { RedisService, RedisModule } from 'nestjs-redis'

export class Redis {
	static service = RedisService
	static register = RedisModule.register
}
