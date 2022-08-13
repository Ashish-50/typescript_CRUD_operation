import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'models/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
 constructor(@InjectModel(User.name) private userModel:Model<UserDocument>)
 {
 }
 async register(data:any):Promise<User>{
  const newuser = new this.userModel(data)
  return newuser.save();
 }
 async findOne(condition:any){
  return this.userModel.findOne(condition)
 }
}
