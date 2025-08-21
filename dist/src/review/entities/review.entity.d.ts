import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Timestamp } from "typeorm";
export declare class ReviewEntity {
    id: number;
    ratings: string;
    comment: string;
    CreatedAt: Timestamp;
    updatedAt: Timestamp;
    user: UserEntity;
    product: ProductEntity;
}
