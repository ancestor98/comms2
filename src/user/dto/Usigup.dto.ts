import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { GenderUser } from "src/utility/common/user-role.enum";


export class UserSignupDto{
     
     @IsNotEmpty({message:"name must not be empty"})
     @IsString({message:"name must be a string"})
    name:string

     //@IsNotEmpty({message:"email must not  be empty"})
     @IsOptional()
     @IsEmail({},{message:"please provide a valid email, would you?"})
     email:string
     
    @IsOptional()
     @IsString({message:"phone must be a string"})
     phone:string

     @IsOptional()
     @IsEnum(GenderUser)
     gender:GenderUser

      @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Password entered is weak'})
     @MaxLength(32)
     @MinLength(8)
     @IsNotEmpty({message:"password must  not be empty"})
     password:string


}