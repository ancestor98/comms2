import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from "class-validator";

export class SignInDto{
    @ValidateIf((o)=>!o.phone)
     @IsNotEmpty({message:"email/phone must not  be empty"})
     @IsEmail({},{message:"please provide a valid email, would you?"})
    email:string;

     @ValidateIf((o)=>!o.email)
     @IsNotEmpty({message:"phone must not  be empty"})
     @IsPhoneNumber(null,{message:"please provide a valid phone number, would you?"})
    phone:string

    @IsNotEmpty({message:"password must  not be empty"})
     password:string




}