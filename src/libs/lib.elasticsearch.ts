import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'

export class ElasticSeach {
	static service = ElasticsearchService
	static register = ElasticsearchModule.register
}
