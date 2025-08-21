"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./entities/review.entity");
const typeorm_2 = require("typeorm");
const product_service_1 = require("../product/product.service");
let ReviewService = class ReviewService {
    constructor(reviewRespository, productService) {
        this.reviewRespository = reviewRespository;
        this.productService = productService;
    }
    async createReview(data, user) {
        try {
            const product = await this.productService.findOne(data.productId);
            if (!product)
                throw new common_1.NotFoundException("no product found");
            let review = await this.findOneByUserAndProduct(user.id, data.productId);
            if (!review) {
                review = this.reviewRespository.create({
                    ratings: data.ratings,
                    comment: data.comment,
                    product,
                    user
                });
            }
            else {
                review.ratings = data.ratings;
                review.comment = data.comment;
            }
            const saved = await this.reviewRespository.save(review);
            return saved;
        }
        catch (error) {
            console.error('Review creation error:', error);
            throw new Error('Failed to create or update review');
        }
    }
    async allproductReviws(id) {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return await this.reviewRespository.find({
            where: {
                product: { id },
            }, relations: {
                user: true,
                product: {
                    category: true
                }
            }
        });
    }
    findAll() {
        return `This action returns all review`;
    }
    async findOne(id) {
        const review = await this.reviewRespository.findOne({
            where: { id },
            relations: {
                user: true,
                product: {
                    category: true
                }
            }
        });
        if (!review)
            throw new common_1.NotFoundException("reviw not found");
        return review;
    }
    update(id, updateReviewDto) {
        return `This action updates a #${id} review`;
    }
    async remove(id) {
        const review = await this.findOne(id);
        return this.reviewRespository.remove(review);
    }
    async findOneByUserAndProduct(userId, productId) {
        return await this.reviewRespository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
            relations: {
                user: true,
                product: {
                    category: true
                }
            }
        });
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService])
], ReviewService);
//# sourceMappingURL=review.service.js.map