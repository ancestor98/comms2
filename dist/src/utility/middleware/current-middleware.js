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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_service_1 = require("../../user/user.service");
let CurrentUserMiddleware = class CurrentUserMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        const authHeaders = req.headers['authorization'];
        if (!authHeaders || (0, class_validator_1.isArray)(authHeaders) || !authHeaders.startsWith('Bearer ')) {
            req.currentUser = null;
            return next();
        }
        const token = authHeaders.split(' ')[1];
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET_KEY);
            const currentUser = await this.userService.findOne(+payload.id);
            req.currentUser = currentUser ?? null;
        }
        catch (err) {
            req.currentUser = null;
        }
        next();
    }
};
exports.CurrentUserMiddleware = CurrentUserMiddleware;
exports.CurrentUserMiddleware = CurrentUserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], CurrentUserMiddleware);
//# sourceMappingURL=current-middleware.js.map