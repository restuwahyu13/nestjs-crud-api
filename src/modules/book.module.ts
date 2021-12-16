import { Module } from '@nestjs/common'

import { BookController } from '@controllers/book.controller'
import { BookService } from '@services/book.service'
import { Book } from '@models/model.book'
import { Typeorm } from '@libs/lib.typeorm'

@Module({
	controllers: [BookController],
	providers: [BookService],
	imports: [Typeorm.forFeature([Book])],
	exports: [Typeorm.typeModule, BookService]
})
export class BookModule {}
