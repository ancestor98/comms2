import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message:"title can not be empty"})
    @IsString()
    tittle:string;

    @IsNotEmpty({message:"description can not be empty"})
    @IsString()
    description:string

     @IsNotEmpty({message:"price  can not be empty"})
    @IsString()
    price:number
    
     @IsNotEmpty({message:"stock  can not be empty"})
    @IsNumber({},{message:"stock should be in number"})
    stock:number;

     
     @IsArray({message:'images should be in array format'})
    images:string[]

     @IsNotEmpty({message:"category can not be empty"})
     @IsNumber({},{message:"category should be in number"})
     categoryId:number
}
