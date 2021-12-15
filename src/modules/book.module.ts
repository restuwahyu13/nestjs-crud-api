import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BookController } from '@controllers/book.controller'
import { BookService } from '@services/book.service'
import { Book } from '@models/model.book'

@Module({
	controllers: [BookController],
	providers: [BookService],
	imports: [TypeOrmModule.forFeature([Book])],
	exports: [TypeOrmModule, BookService]
})
export class BookModule {}
