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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const update_review_dto_1 = require("./dto/update-review.dto");
const current_userdecorator_1 = require("../utility/decorators/current-userdecorator");
const user_entity_1 = require("../user/entities/user.entity");
const authentication_guards_1 = require("../utility/guards/authentication.guards");
const allowed_guard_1 = require("../utility/guards/allowed.guard");
const user_role_enum_1 = require("../utility/common/user-role.enum");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async create(body, currentUser) {
        return this.reviewService.createReview(body, currentUser);
    }
    findAll() {
        return this.reviewService.findAll();
    }
    async allproductReviws(productId) {
        return await this.reviewService.allproductReviws(productId);
    }
    findOne(id) {
        return this.reviewService.findOne(+id);
    }
    update(id, updateReviewDto) {
        return this.reviewService.update(+id, updateReviewDto);
    }
    remove(id) {
        return this.reviewService.remove(+id);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.UseGuards)(authentication_guards_1.AuthenticationGuard, (0, allowed_guard_1.AllowedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)("creatReview"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_userdecorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "allproductReviws", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "remove", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map