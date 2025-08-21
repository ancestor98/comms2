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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const Usigup_dto_1 = require("./dto/Usigup.dto");
const user_entity_1 = require("./entities/user.entity");
const SigninDto_1 = require("./dto/SigninDto");
const changass_dto_1 = require("./dto/changass.dto");
const current_userdecorator_1 = require("../utility/decorators/current-userdecorator");
const authentication_guards_1 = require("../utility/guards/authentication.guards");
const user_role_enum_1 = require("../utility/common/user-role.enum");
const allowed_guard_1 = require("../utility/guards/allowed.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(userSignup) {
        return { user: await this.userService.signup(userSignup) };
    }
    async signin(signInDto) {
        const user = await this.userService.signin(signInDto);
        const accessToken = await this.userService.accessToken(user);
        return { user: { accessToken, user } };
    }
    async findAll() {
        const users = await this.userService.findAll();
        return { users };
    }
    async findOne(id) {
        return this.userService.findOne(+id);
    }
    async changePassWord(id, changePassWord) {
        return await this.userService.changePassword(id, changePassWord.oldPassword, changePassWord.newPassword);
    }
    update(userId, body, updateUserDto) {
        console.log('Raw body:', body);
        console.log('Parsed DTO:', updateUserDto);
        return this.userService.update(+userId, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
    getProfile(currentUser) {
        return currentUser;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Usigup_dto_1.UserSignupDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("signin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SigninDto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signin", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guards_1.AuthenticationGuard, (0, allowed_guard_1.AllowedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/change-password'),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, changass_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassWord", null);
__decorate([
    (0, common_1.Patch)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guards_1.AuthenticationGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, current_userdecorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map