import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoriesService {

  constructor (@InjectRepository(CategoryEntity)
  private readonly categoryRepository:Repository<CategoryEntity>
){}
   
  async create(createCategoryDto: CreateCategoryDto, currentuser:UserEntity):Promise<CategoryEntity> {
   const category = await this.categoryRepository.create({
      ...createCategoryDto,
      addedBy: currentuser,
    });

return this.categoryRepository.save(category)
  }

async findAll(){
  return this.categoryRepository.find();
}



  async findOne(id: number) :Promise<{data:CategoryEntity;message:string}>{
    const one= await this.categoryRepository.findOne({
      where:{id:id},
      relations:{addedBy:true}


    })
     if (!one) {
    throw new NotFoundException('you got demential or something no shit id in here');
  }

    return{
      message:"here is the nigga you loking for",
      data:one
    }
  }

  async update(id: number,fields: Partial<UpdateCategoryDto>): Promise<{ data: CategoryEntity; message: string }> {
 const { data: category } = await this.findOne(id);
  if (!category) {
    throw new NotFoundException('you got demential or something no shit id in here');
  }

  Object.assign(category, fields);

  const updated = await this.categoryRepository.save(category); // ✅ Only the entity goes here

  return {
    data: updated, // ✅ response wrapping happens here
    message: 'Successfully updated',
  };
}

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
