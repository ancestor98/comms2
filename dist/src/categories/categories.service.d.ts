import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    create(createCategoryDto: CreateCategoryDto, currentuser: UserEntity): Promise<CategoryEntity>;
    findAll(): Promise<CategoryEntity[]>;
    findOne(id: number): Promise<{
        data: CategoryEntity;
        message: string;
    }>;
    update(id: number, fields: Partial<UpdateCategoryDto>): Promise<{
        data: CategoryEntity;
        message: string;
    }>;
    remove(id: number): string;
}
