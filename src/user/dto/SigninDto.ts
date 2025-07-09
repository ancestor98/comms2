import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto{
    
     @IsNotEmpty({message:"email must not  be empty"})
     @IsEmail({},{message:"please provide a valid email, would you?"})
    email:string

    @IsNotEmpty({message:"password must  not be empty"})
     password:string




}