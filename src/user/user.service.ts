import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {  UserSignupDto } from './dto/Usigup.dto';
import { hash,compare } from "bcrypt"
import { SignInDto } from './dto/SigninDto';
import { access } from 'fs';
import { sign } from 'jsonwebtoken';
import * as argon from 'argon2';

import * as dotenv from 'dotenv';
import { EMailService } from 'src/email/email.service';
import { extractCountryCode, formatPhoneNumberWithCountryCode, validatePhoneNumber } from 'src/utility/phone.util';
import { handleAndThrowError } from 'src/utility/error.util';
import { CentralLoggerService } from 'src/utility/logger/central-logger';
dotenv.config();

@Injectable()

export class UserService {

constructor(
  @InjectRepository(UserEntity)
   private usersRepository:Repository<UserEntity>,
   private readonly emailService:EMailService,
   private readonly centralogger:CentralLoggerService
){}

async signup(userSignupDto:UserSignupDto):Promise<UserEntity>{
  
  if(!userSignupDto.email && !userSignupDto.phone){
    throw new BadRequestException("provide either phone or email to sign up")
  }
if(userSignupDto.phone){
    const PhoneValidation= validatePhoneNumber(userSignupDto.phone);
    if(!PhoneValidation.isValid){
      throw new BadRequestException("phone  number is not good you know")||"invalid phonenumber"
    }
    const { countryCode, localNumber } = extractCountryCode(userSignupDto.phone);
   const  formattedphone = formatPhoneNumberWithCountryCode(countryCode, localNumber);
    userSignupDto.phone= formattedphone
  }
  const search= userSignupDto.email?'email':"phone"
   const searchValue= userSignupDto.email?
  userSignupDto.email:userSignupDto.phone?.toString()
  
  const userExist = await this.usersRepository.findOne({
  where: { [search]: searchValue }, 
  select: ["id","deletedAt",'email','phone'],   
  withDeleted:true //helps  softdelete
                  
});
if (userExist && userExist.deletedAt)
  this.centralogger.logUser(
'Found soft-deleted user with same email, allowing recreation',
{
  userExistId:userExist.id,
  deletedAT:userExist.deletedAt
}

  );


 if(userExist) {
  const messge= userSignupDto.email 
?"this mufuking email isnt available"
:"this number has been taken"
  
  return handleAndThrowError(
    new HttpException(messge,HttpStatus.BAD_REQUEST,)
  );
 }
  
userSignupDto.password= await argon.hash(userSignupDto.password)
  let user= this.usersRepository.create(userSignupDto)
  user =await  this.usersRepository.save(user)
 if(user.email){
  await this.emailService.sendMail({
    
      recipient: user.email,
      subject:"welcome to our app",
      text:'welcome to ourplartform',
      html:`<h2>Welcome!</h2><p>Thank you for signing up with us.</p>`
    

  })
  console.log('✅ Welcome email sent!');
}
   delete user.password
  if(user.email== null || user.email== undefined){
    delete user.email}
    if(user.phone== null || user.phone== undefined){
      delete user.phone
    }
  return user


}



 async signin(signInDto:SignInDto):Promise<UserEntity>{
   let UserExist: UserEntity | undefined

    if (signInDto.email){
   UserExist=  await this.usersRepository.createQueryBuilder("users")
  .addSelect('users.password').where("users.email=:email",{email:signInDto.email})
  .getOne();
}else if(signInDto.phone){
  UserExist=  await this.usersRepository.createQueryBuilder("users")
  .addSelect('users.password').where("users.phone=:phone",{phone:signInDto.phone})
  .getOne();
}else{
   // This case should ideally be covered by DTO validation, but good as a fallback
    throw new BadRequestException("Please provide either email or phone number to sign in.");
  }
 if(!UserExist) 
  {throw new BadRequestException("bro you got nothing in here man")
  }
     const isPasswordValid= await compare(signInDto.password,UserExist.password)
  
    if(!isPasswordValid) {
      throw new BadRequestException("bro yoo this password is incorrect man")
    }
      delete UserExist.password
       return UserExist
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return  await this.usersRepository.find()
  }

 async  findOne(id: number) {
     const user= await this.usersRepository.findOneBy({id})

     if(!user){throw new BadRequestException ("nigga i cant find no mufucking id like this here")}

      return user
        
}


 async update(userId: number, updateUserDto:Partial <UpdateUserDto>) {
   console.log('DEBUG: Incoming updateUserDto:', updateUserDto);
  console.log('DEBUG: Incoming userId:', userId);

  const user= await this.findOne(userId)
   console.log('DEBUG: User fetched from DB (before assign):', user);


  if(!user)
  throw new BadRequestException("no userfound")
  Object.assign(user,updateUserDto)
   console.log('DEBUG: User object after Object.assign (before save):', user);


  await this.usersRepository.save(user)
  console.log('DEBUG: User object after save (final log):', user);


  console.log(user)
    return  `User #${userId} updated successfully`;
  }

  remove(id: number) {
    return `This action removes a #${id} updated `;
  }

  FindUserByEmail(email:string){
   return this.usersRepository.findOneBy({email})
  }


 async changePassword(id:number,oldPassword:string,newpassword:string):Promise<{  message: string }>{
  
const user = await this.usersRepository
  .createQueryBuilder("user")
  .addSelect("user.password")
  .where("user.id = :id", { id })
  .getOne();
  if (!user){throw new BadRequestException("nigga i cant find no mufucking id here get lost")}

  console.log('Incoming oldPassword:', oldPassword);
console.log('User from DB:', user);
console.log('User password in DB:', user.password);

   const isPasswordValid= await compare(oldPassword,user.password)
  if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
  }
     const hasheddpassword= await hash(newpassword,10)

     user.password=hasheddpassword
     await this.usersRepository.save(user)
     delete user.password

    return {message:"Password changed successfully"}

 }











//  async changepassword(id:number,oldPassword:string ,newpassword:string){
//   const user= await this.usersRepository.findOneBy({id}) 
//   if(!user){throw new BadRequestException ("nigga i cant find no mufucking id like this here")}

//   const isPasswordValid= await compare(oldPassword,exist.password)
//   if (!isPasswordValid) {
//       throw new BadRequestException('Old password is incorrect');
//     }
//     const hashedPassword= await hash(newpassword,10)
//     user.password=hashedPassword
//     await this.usersRepository.save(user)
//     return { message: 'Password changed successfully' };


//   }


async accessToken(user:UserEntity):Promise<string>{
 
  return sign({ id:user.id,
                email:user.email ,
                phone:user.phone
              },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                {expiresIn:"30m"})

}
}
