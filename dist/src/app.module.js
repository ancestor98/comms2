"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../db/data-source");
const user_module_1 = require("./user/user.module");
const current_middleware_1 = require("./utility/middleware/current-middleware");
const email_module_1 = require("./email/email.module");
const categories_module_1 = require("./categories/categories.module");
const product_module_1 = require("./product/product.module");
const review_module_1 = require("./review/review.module");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
const sentry_config_1 = require("./config/sentry.config");
const sentry_traker_service_1 = require("./utility/sentry-traker.service ");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(current_middleware_1.CurrentUserMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [sentry_config_1.default]
            }),
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOption),
            user_module_1.UserModule,
            email_module_1.EmailModule,
            categories_module_1.CategoriesModule,
            product_module_1.ProductModule,
            review_module_1.ReviewModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    autoLogging: false,
                    level: "debug",
                    transport: {
                        target: "pino-pretty",
                        options: {
                            colorize: true,
                            translateTime: 'SYS:standard'
                        }
                    }
                }
            }),
            upload_module_1.UploadModule
        ],
        controllers: [],
        providers: [
            sentry_traker_service_1.SentryTrackerService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map