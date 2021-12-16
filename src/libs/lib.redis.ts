import { RedisService, RedisModule } from 'nestjs-redis'
import { Redis as RedisCommand } from 'ioredis'

export class Redis {
	static service = RedisService
	static register = RedisModule.register

	static async keyExist(service: RedisCommand, key: string): Promise<number> {
		const res: number = await service.exists(key)
		return res
	}

	static async keyExpired(service: RedisCommand, key: string): Promise<number> {
		const res: number = await service.ttl(key)
		return res
	}

	static async deleteKey(service: RedisCommand, key: string): Promise<number> {
		const res: number = await service.del(key)
		return res
	}

	static async getData(service: RedisCommand, key: string): Promise<Record<string, any>> {
		await service.expire(key, 24 * 60 * 60 * 1) // expiredAt 1 days
		const res: Record<string, any> = await service.hgetall(key)
		return JSON.parse(res.data)
	}

	static async setData(
		service: RedisCommand,
		key: string,
		data: string | Record<string, any> | Record<string, any>[]
	): Promise<number> {
		const res: number = await service.hset(key, JSON.stringify({ record: data }))
		return res
	}
}
