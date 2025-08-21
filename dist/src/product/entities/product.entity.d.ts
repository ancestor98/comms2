import { CategoryEntity } from "src/categories/entities/category.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Timestamp } from "typeorm";
export declare class ProductEntity {
    id: number;
    tittle: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Timestamp;
    updateDate: Timestamp;
    addedBy: UserEntity;
    category: CategoryEntity;
    reviews: ReviewEntity;
}
