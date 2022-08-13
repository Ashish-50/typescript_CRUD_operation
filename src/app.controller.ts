import { BadGatewayException, BadRequestException, Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import { Response } from 'express';
 
@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtServices:JwtService
    ) {}

  @Post('register')
  // async register(@Body() body)  // there are two ways of geting data from the body one method is like this here all the body data stored in a variable named body
  async register(
    @Body('fullname') fullname:string,
    @Body('email') email:string,
    @Body('password') password:string,
  ){
    const hashedpassword = await bcrypt.hash(password,12);
    return this.appService.register({
      fullname,
      email,
      password:hashedpassword
    })
  }
  @Post('login')
  async login(
    @Body('email') email:string,
    @Body('password') password:string, 
    @Res({passthrough:true}) response: Response // for sending cookie we use passthrough
  ){
    const user = await this.appService.findOne({email})
    if(!user){
      throw new BadRequestException("Invalid Credentials(email)")
    }
    if(!await bcrypt.compare(password,user.password)){
      console.log(password,user.password)
      throw new BadGatewayException('Invalid Credentials')
    }
    const jwt = await this.jwtServices.signAsync({id:user._id});
    response.cookie('jwt',jwt, {httpOnly:true});

    return {
      message:"you logged in"
    }
  }
}
