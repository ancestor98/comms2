import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { GenderUser, Roles } from "src/utility/common/user-role.enum";
import { Timestamp } from "typeorm";
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: GenderUser;
    password: string;
    roles: Roles[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Date;
    categories: CategoryEntity;
    products: ProductEntity;
    reviwe: ReviewEntity;
}
