
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required:true}) //if we have to give some validation to this field 
  fullname: string;

  @Prop({required:true,index:true,unique:true})
  email: string;

  @Prop({required:true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
