import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { bookController } from './app.controller';
import { bookService } from './book.service';
import { Book, BookSchema } from '../models/books.schema';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGODBURL),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ], // here forRoot method is same as configuration as we did mongoose.connect
  controllers: [bookController], // if we have multiple controller then we have to import here also
  providers: [bookService], //if we have multiple services then we have to import here also
})
export class AppModule {}
