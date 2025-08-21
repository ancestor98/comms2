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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const categories_service_1 = require("../categories/categories.service");
let ProductService = class ProductService {
    constructor(productRepository, categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }
    async create(Data, currentUser) {
        const { data: category } = await this.categoryService.findOne(+Data.categoryId);
        const product = await this.productRepository.create(Data);
        product.category = category;
        product.addedBy = currentUser;
        return this.productRepository.save(product);
    }
    findAll() {
        return this.productRepository.find();
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                addedBy: true,
                category: true
            }
        });
        if (!product)
            throw new common_1.NotFoundException("product not found");
        return this.productRepository.save(product);
    }
    async update(id, updateProductDto, currentUser) {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        product.addedBy = currentUser;
        if (updateProductDto.categoryId) {
            const { data: category } = await this.categoryService.findOne(+updateProductDto.categoryId);
            product.category = category;
        }
        return await this.productRepository.save(product);
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService])
], ProductService);
//# sourceMappingURL=product.service.js.map