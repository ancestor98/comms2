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
exports.UserSignupDto = void 0;
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../../utility/common/user-role.enum");
class UserSignupDto {
}
exports.UserSignupDto = UserSignupDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "name must not be empty" }),
    (0, class_validator_1.IsString)({ message: "name must be a string" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: "please provide a valid email, would you?" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "phone must be a string" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_role_enum_1.GenderUser),
    __metadata("design:type", String)
], UserSignupDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password entered is weak'
    }),
    (0, class_validator_1.MaxLength)(32),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsNotEmpty)({ message: "password must  not be empty" }),
    __metadata("design:type", String)
], UserSignupDto.prototype, "password", void 0);
//# sourceMappingURL=Usigup.dto.js.map