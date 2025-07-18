import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserSignupDto{
     
     @IsNotEmpty({message:"name must not be empty"})
     @IsString({message:"name must be a string"})
    name:string

     //@IsNotEmpty({message:"email must not  be empty"})
     @IsOptional()
     @IsEmail({},{message:"please provide a valid email, would you?"})
     email:string
     
    @IsOptional()
    @IsNotEmpty({message:"phone must not  be empty"})
    phone:string


     @IsNotEmpty({message:"password must  not be empty"})
     password:string


}