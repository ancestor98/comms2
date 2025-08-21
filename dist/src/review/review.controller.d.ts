import { ReviewService } from './review.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(body: {
        productId: number;
        ratings: string;
        comment: string;
    }, currentUser: UserEntity): Promise<ReviewEntity>;
    findAll(): string;
    allproductReviws(productId: number): Promise<ReviewEntity[]>;
    findOne(id: string): Promise<ReviewEntity>;
    update(id: string, updateReviewDto: UpdateReviewDto): string;
    remove(id: string): Promise<ReviewEntity>;
}
