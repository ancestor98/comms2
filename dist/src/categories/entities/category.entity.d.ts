import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Timestamp } from "typeorm";
export declare class CategoryEntity {
    id: number;
    title: string;
    description: string;
    createdAt: Timestamp;
    upDatedAt: Timestamp;
    addedBy: UserEntity;
    products: ProductEntity[];
}
