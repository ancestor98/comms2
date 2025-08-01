import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { runInNewContext } from 'vm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UserEntity } from 'src/user/entities/user.entity';
import { truncate } from 'fs';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRespository: Repository<ReviewEntity>,
    private readonly productService:ProductService
  ) {}


  //createRview(createReviewDto: CreateReviewDto) {
 async createReview(data:{
  productId:number;
  ratings:string
  comment:string

 },user:UserEntity
){try{
  //find product first
  const product= await this.productService.findOne(data.productId)
  if(!product)throw new NotFoundException("no product found")
  
    let review= await this.findOneByUserAndProduct(user.id,data.productId)
    if(!review){
   review = this.reviewRespository.create({
    ratings:data.ratings,
    comment:data.comment,
    product,
    user
  })

} else{
   review.ratings = data.ratings;
  review.comment = data.comment;

}
  const saved= await this.reviewRespository.save(review)
  return saved
   

 }catch(error){
  throw new  Error("Failed to create or update review")

 }
}

    
  

  findAll() {
    return `This action returns all review`;
  }

 async findOne(id: number) {
    //return  await this.
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }


async findOneByUserAndProduct(userId: number,  productId: number) {
  return await this.reviewRespository.findOne({
    where: {
      user: { id: userId },
      product: { id:  productId },
    },
    relations:{
      user:true,
      product:{
        category:true
      }
    }
  });
}
}
