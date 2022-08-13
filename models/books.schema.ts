/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({required:true,index:true}) //if we have to give some validation to this field 
  name: string;

  @Prop({required:true})
  author: string;

  @Prop({required:true})
  publishYear: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
