import { BadRequestException, Injectable } from '@nestjs/common';
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
import * as dotenv from 'dotenv';
import { EMailService } from 'src/email/email.service';
dotenv.config();

@Injectable()

export class UserService {

constructor(
  @InjectRepository(UserEntity)
   private usersRepository:Repository<UserEntity>,
   private readonly emailService:EMailService
){}
async signup(userSignupDto:UserSignupDto):Promise<UserEntity>{
  const search= userSignupDto.email?'email':"phone"
  const searchValue= userSignupDto.email?
  userSignupDto.email:userSignupDto.phone?.toString()
  
//const userExist= await this.FindUserByEmail(userSignupDto.email?'email':"phone" )
const userExist = await this.usersRepository.findOne({
  where: { [search]: searchValue }, 
  select: ["id"]                    
});
if(userExist) throw new BadRequestException (
  userSignupDto.email?
  'this mufuking email isnt available': 'no phone number was given')
  
  userSignupDto.password= await hash(userSignupDto.password,10)


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
  const UserExist=  await this.usersRepository.createQueryBuilder("users")
  .addSelect('users.password').where("users.email=:email",{email:signInDto.email})
  .getOne();
  if(!UserExist) throw new BadRequestException("bro you got nothing in here man")
     const isPasswordValid= await compare(signInDto.password,UserExist.password)
    if(!isPasswordValid) throw new BadRequestException("bro yoo this password is incorrect man")
     
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


 update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
                email:user.email },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                {expiresIn:"30m"})

}
}
