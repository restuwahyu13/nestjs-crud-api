import { Module } from '@nestjs/common'

import { BookController } from '@controllers/book.controller'
import { BookService } from '@services/book.service'
import { Book } from '@models/model.book'
import { Typeorm } from '@libs/lib.typeorm'
import { ElasticSeach } from '@libs/lib.elasticsearch'

@Module({
	controllers: [BookController],
	providers: [BookService, ElasticSeach.service],
	imports: [Typeorm.forFeature([Book])],
	exports: [BookService, Typeorm.typeModule]
})
export class BookModule {}
