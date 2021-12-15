import { Injectable, HttpStatus as Status } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Book } from '@models/model.book'
import { DTOBookById, DTOBook } from '@dto/dto.book'

@Injectable()
export class BookService {
	constructor(@InjectRepository(Book) private model: Repository<Book>) {}

	async createdBook(body: DTOBook): Promise<any> {
		try {
			const checkBookExist: Book = await this.model.findOne({ where: { name: body.name, isbn: body.isbn } })
			if (checkBookExist) {
				throw { code: Status.CONFLICT, message: 'Book already exist' }
			}

			const createNewBook = await this.model.insert({ ...body, created_at: new Date() })
			if (!createNewBook) {
				throw { code: Status.FORBIDDEN, message: 'Create new book failed' }
			}

			return Promise.resolve({ code: Status.CREATED, message: 'Create new book success' })
		} catch (e: any) {
			console.error(e)
			return Promise.reject({ code: e.code || Status.INTERNAL_SERVER_ERROR, message: e.message })
		}
	}

	async getAllBooks(): Promise<any> {
		try {
			const getAllBooks: Book[] = await this.model.find({ order: { id: 'DESC' } })
			if (!getAllBooks.length) {
				throw { code: Status.NOT_FOUND, message: 'Books data is not exist' }
			}
			return Promise.resolve({ code: Status.OK, message: 'Books data already', data: getAllBooks })
		} catch (e: any) {
			console.error(e)
			return Promise.reject({ code: e.code || Status.INTERNAL_SERVER_ERROR, message: e.message })
		}
	}

	async getBookById(params: DTOBookById): Promise<any> {
		try {
			const getBook: Book = await this.model.findOne(params.id)
			if (!getBook) {
				throw { code: Status.NOT_FOUND, message: 'Book data is not exist' }
			}
			return Promise.resolve({ code: Status.OK, message: 'Book data already', data: getBook })
		} catch (e: any) {
			console.error(e)
			return Promise.reject({ code: e.code || Status.INTERNAL_SERVER_ERROR, message: e.message })
		}
	}

	async deletedBookById(params: DTOBookById): Promise<any> {
		try {
			const checkBook: Book = await this.model.findOne(params.id)
			if (!checkBook) {
				throw { code: Status.NOT_FOUND, message: 'Book data is not exist' }
			}

			const deleteBook = await this.model.delete({ id: params.id })
			if (!deleteBook.affected) {
				throw { code: Status.NOT_FOUND, message: 'Delete book data failed' }
			}

			return Promise.resolve({ code: Status.OK, message: 'Delete book data success' })
		} catch (e: any) {
			console.error(e)
			return Promise.reject({ code: e.code || Status.INTERNAL_SERVER_ERROR, message: e.message })
		}
	}

	async updatedBookById(body: DTOBook, params: DTOBookById): Promise<any> {
		try {
			const checkBook: Book = await this.model.findOne(params.id)
			if (!checkBook) {
				throw { code: Status.CONFLICT, message: 'Book data is not exist' }
			}

			const createNewBook = await this.model.update({ id: params.id }, { ...body, updated_at: new Date() })
			if (!createNewBook.affected) {
				throw { code: Status.FORBIDDEN, message: 'Update old book data failed' }
			}

			return Promise.resolve({ code: Status.OK, message: 'Update old book data success' })
		} catch (e: any) {
			console.error(e)
			return Promise.reject({ code: e.code || Status.INTERNAL_SERVER_ERROR, message: e.message })
		}
	}
}
