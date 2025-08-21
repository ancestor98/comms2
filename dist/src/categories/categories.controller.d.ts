import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryEntity } from './entities/category.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto, currentuser: UserEntity): Promise<CategoryEntity>;
    findAll(): Promise<CategoryEntity[]>;
    findOne(id: string): Promise<{
        data: CategoryEntity;
        message: string;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        data: CategoryEntity;
        message: string;
    }>;
    remove(id: string): string;
}
