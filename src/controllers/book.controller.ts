import { Controller, Get, Post, Body, Res, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { OutgoingMessage } from 'http'
import { Response } from 'express'

import { BookService } from '@services/book.service'
import { JwtAuthGuard } from '@libs/internal/jwt/lib.guard'
import { DTOBookById, DTOBook } from '@dto/dto.book'

@Controller('api/v1/book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createdBook(@Res() res: Response, @Body() body: DTOBook): Promise<OutgoingMessage> {
		try {
			const service: Record<string, any> = await this.bookService.createdBook(body)
			return res.status(service.code).json(service)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllBooks(@Res() res: Response): Promise<OutgoingMessage> {
		try {
			const service: Record<string, any> = await this.bookService.getAllBooks()
			return res.status(service.code).json(service)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getBookById(@Res() res: Response, @Param() params: DTOBookById): Promise<OutgoingMessage> {
		try {
			const service: Record<string, any> = await this.bookService.getBookById(params)
			return res.status(service.code).json(service)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteBookById(@Res() res: Response, @Param() params: DTOBookById): Promise<OutgoingMessage> {
		try {
			const service: Record<string, any> = await this.bookService.deletedBookById(params)
			return res.status(service.code).json(service)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async updatedBookById(@Res() res: Response, @Body() body: DTOBook, @Param() params: DTOBookById): Promise<OutgoingMessage> {
		try {
			const service: Record<string, any> = await this.bookService.updatedBookById(body, params)
			return res.status(service.code).json(service)
		} catch (e: any) {
			return res.status(e.code).json(e)
		}
	}
}
