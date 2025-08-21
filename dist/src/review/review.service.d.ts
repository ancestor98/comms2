import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class ReviewService {
    private readonly reviewRespository;
    private readonly productService;
    constructor(reviewRespository: Repository<ReviewEntity>, productService: ProductService);
    createReview(data: {
        productId: number;
        ratings: string;
        comment: string;
    }, user: UserEntity): Promise<ReviewEntity>;
    allproductReviws(id: number): Promise<ReviewEntity[]>;
    findAll(): string;
    findOne(id: number): Promise<ReviewEntity>;
    update(id: number, updateReviewDto: UpdateReviewDto): string;
    remove(id: number): Promise<ReviewEntity>;
    findOneByUserAndProduct(userId: number, productId: number): Promise<ReviewEntity>;
}
