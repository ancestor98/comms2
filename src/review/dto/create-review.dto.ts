import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReviewDto {
@IsNotEmpty({message:"product should noot be Empty"})
@IsNumber()
productId:number

@IsNotEmpty({message:"ratings should not be empty"})
ratings:string;

 @IsString()
 @IsNotEmpty({message:"comment should not be empty"})
 comment:string;

}
