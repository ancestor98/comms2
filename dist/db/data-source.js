"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOption = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../src/user/entities/user.entity");
const category_entity_1 = require("../src/categories/entities/category.entity");
const product_entity_1 = require("../src/product/entities/product.entity");
const review_entity_1 = require("../src/review/entities/review.entity");
(0, dotenv_1.config)();
exports.dataSourceOption = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: 'neondb_owner',
    password: "npg_jQ21TNsadGhR",
    database: 'neondb',
    entities: [user_entity_1.UserEntity, category_entity_1.CategoryEntity, product_entity_1.ProductEntity, review_entity_1.ReviewEntity],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOption);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map