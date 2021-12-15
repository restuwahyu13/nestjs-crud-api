import { Controller, Get, Post, Body, Res, Param, Delete, Put } from '@nestjs/common'
import { OutgoingMessage } from 'http'
import { Response } from 'express'

import { BookService } from '@services/book.service'
import { DTOBookById, DTOBook } from '@dto/dto.book'

@Controller('api/v1/book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Post()
	async createdBook(@Res() res: Response, @Body() body: DTOBook): Promise<OutgoingMessage> {
		try {
			const createBook: Record<string, any> = await this.bookService.createdBook(body)
			return res.status(createBook.code).json(createBook)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@Get()
	async getAllBooks(@Res() res: Response): Promise<OutgoingMessage> {
		try {
			const getAllBooks: Record<string, any> = await this.bookService.getAllBooks()
			return res.status(getAllBooks.code).json(getAllBooks)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@Get(':id')
	async getBookById(@Res() res: Response, @Param() params: DTOBookById): Promise<OutgoingMessage> {
		try {
			const getBookById: Record<string, any> = await this.bookService.getBookById(params)
			return res.status(getBookById.code).json(getBookById)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@Delete(':id')
	async deleteBookById(@Res() res: Response, @Param() params: DTOBookById): Promise<OutgoingMessage> {
		try {
			const deleteBookById: Record<string, any> = await this.bookService.deletedBookById(params)
			return res.status(deleteBookById.code).json(deleteBookById)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@Put(':id')
	async updatedBookById(@Res() res: Response, @Body() body: DTOBook, @Param() params: DTOBookById): Promise<OutgoingMessage> {
		try {
			const createBook: Record<string, any> = await this.bookService.updatedBookById(body, params)
			return res.status(createBook.code).json(createBook)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}
}
