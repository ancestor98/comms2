import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    findOne(id: string): Promise<ProductEntity>;
    update(id: string, updateProductDto: UpdateProductDto, currentuser: UserEntity): Promise<ProductEntity>;
    remove(id: string): string;
}
