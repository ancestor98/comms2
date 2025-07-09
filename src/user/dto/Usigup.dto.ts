import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserSignupDto{
     
     @IsNotEmpty({message:"name must not be empty"})
     @IsString({message:"name must be a string"})
    name:string

     @IsNotEmpty({message:"email must not  be empty"})
     @IsEmail({},{message:"please provide a valid email, would you?"})
    email:string


     @IsNotEmpty({message:"password must  not be empty"})
     password:string


}