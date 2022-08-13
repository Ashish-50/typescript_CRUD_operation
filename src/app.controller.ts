import { Controller, Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bookService } from './book.service';
import {
  Body,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Book } from '../models/books.schema';

@Controller('books') //this is the basic routing
export class bookController {
  constructor(private readonly bookService: bookService) {}

  @Post('/create') //here we can give our name for the route
  async createBook(@Res() response, @Body() book: Book) {
    const newBook = await this.bookService.create(book);
    return response.status(HttpStatus.CREATED).json({
      newBook,
    });
  }

  @Get('/getall')
  async fetchAll(@Res() response): Promise<any> {
    const books = await this.bookService.readAll();
    return response.status(HttpStatus.OK).json({
      books,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const book = await this.bookService.readById(id);
    return response.status(HttpStatus.OK).json({
      book,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() book: Book) {
    const updatedBook = await this.bookService.update(id, book);
    return response.status(HttpStatus.OK).json({
      updatedBook,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedBook = await this.bookService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedBook,
    });
  }
}
