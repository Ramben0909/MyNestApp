import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto'; // Fix the import path
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: DatabaseService,
    private readonly jwtservice: JwtService
  ) {}

  async login(loginData: LoginDto){
    const {email, password} = loginData;
    const user = await this.dataservice.user.findFirst({
      where:{
        email: email
      }
    })
    if(!user){
      return "User not found"
    }
    if(!user){
      throw new NotFoundException("No user exists with entered email")
    }
    const validaterPassword = await bcrypt.compare(password, user.password)
    if(!validaterPassword){
      throw new NotFoundException("Invalid password")
    }
    return {
      token : this.jwtservice.sign({email}),
    }
  }
  async register(registerData: RegisterUserDto) {
     const user = await this.dataservice.user.findFirst({
      where:{
        email: registerData.email
      }
     })
      if(user){
        return "User already exists"
      }
      registerData.password = await bcrypt.hash(registerData.password,10)
      const res = await this.dataservice.user.create({data: registerData})
      return res;
  }


}
