import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateCategoryDto {

    @IsString({message:"title ca not be string"})
    @IsNotEmpty({message:"title should not be empty"})
    title:string

     @IsString({message:"description ca not be string"})
    @IsNotEmpty({message:"description should not be empty"})
    description:string
}
