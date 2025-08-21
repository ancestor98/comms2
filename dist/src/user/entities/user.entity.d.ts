import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { Roles } from "src/utility/common/user-role.enum";
import { Timestamp } from "typeorm";
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    roles: Roles[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    categories: CategoryEntity;
    products: ProductEntity;
    reviwe: ReviewEntity;
}
