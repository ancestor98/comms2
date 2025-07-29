import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { AllowedGuard } from 'src/utility/guards/allowed.guard';
import { AllowedRoles } from 'src/utility/decorators/allowed-roles.decorator';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity>,
   private readonly categoryService:CategoriesService){}
//   async create(createProductDto: CreateProductDto,currentUser:UserEntity) {
//     const {data:category}= await this.categoryService.findOne(+createProductDto.categoryId)
//     const product=  this.productRepository.create(createProductDto)
//     product.category=category;
//     product.addedBy=currentUser
//     return  await this.productRepository.save(product)
    
//   }
async create(Data:CreateProductDto,currentUser:UserEntity){


const {data:category}= await this.categoryService.findOne(+Data.categoryId)
  const product= await this.productRepository.create(Data)
  product.category=category
  product.addedBy=currentUser
  return this.productRepository.save(product)
}


  findAll() {
    return this.productRepository.find()
  }

  async findOne(id: number) {
    const product=await this.productRepository.findOne({
      where:{id:id},
      relations:{
        addedBy:true,
        category:true
      }
      
      })
      if(!product) throw new NotFoundException("product not found")
        return this.productRepository.save(product)
  }

  async update(id: number, updateProductDto:Partial <UpdateProductDto>,currentUser:UserEntity):
  Promise<ProductEntity> {
    const product= await this.findOne(id)
    
    Object.assign(product,updateProductDto)
    product.addedBy=currentUser
    if(updateProductDto.categoryId){

      const {data:category}= await this .categoryService.findOne(+updateProductDto.categoryId)
      product.category=category
    }
    
    return await this.productRepository.save(product)
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
