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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const argon = require("argon2");
const dotenv = require("dotenv");
const email_service_1 = require("../email/email.service");
const phone_util_1 = require("../utility/phone.util");
const error_util_1 = require("../utility/error.util");
const central_logger_1 = require("../utility/logger/central-logger");
dotenv.config();
let UserService = class UserService {
    constructor(usersRepository, emailService, centralogger) {
        this.usersRepository = usersRepository;
        this.emailService = emailService;
        this.centralogger = centralogger;
    }
    async signup(userSignupDto) {
        if (!userSignupDto.email && !userSignupDto.phone) {
            throw new common_1.BadRequestException("provide either phone or email to sign up");
        }
        if (userSignupDto.phone) {
            const PhoneValidation = (0, phone_util_1.validatePhoneNumber)(userSignupDto.phone);
            if (!PhoneValidation.isValid) {
                throw new common_1.BadRequestException("phone  number is not good you know") || "invalid phonenumber";
            }
            const { countryCode, localNumber } = (0, phone_util_1.extractCountryCode)(userSignupDto.phone);
            const formattedphone = (0, phone_util_1.formatPhoneNumberWithCountryCode)(countryCode, localNumber);
            userSignupDto.phone = formattedphone;
        }
        const search = userSignupDto.email ? 'email' : "phone";
        const searchValue = userSignupDto.email ?
            userSignupDto.email : userSignupDto.phone?.toString();
        const userExist = await this.usersRepository.findOne({
            where: { [search]: searchValue },
            select: ["id", "deletedAt", 'email', 'phone'],
            withDeleted: true
        });
        if (userExist && userExist.deletedAt)
            this.centralogger.logUser('Found soft-deleted user with same email, allowing recreation', {
                userExistId: userExist.id,
                deletedAT: userExist.deletedAt
            });
        if (userExist) {
            const messge = userSignupDto.email
                ? "this mufuking email isnt available"
                : "this number has been taken";
            return (0, error_util_1.handleAndThrowError)(new common_1.HttpException(messge, common_1.HttpStatus.BAD_REQUEST));
        }
        userSignupDto.password = await argon.hash(userSignupDto.password);
        let user = this.usersRepository.create(userSignupDto);
        user = await this.usersRepository.save(user);
        if (user.email) {
            await this.emailService.sendMail({
                recipient: user.email,
                subject: "welcome to our app",
                text: 'welcome to ourplartform',
                html: `<h2>Welcome!</h2><p>Thank you for signing up with us.</p>`
            });
            console.log('✅ Welcome email sent!');
        }
        delete user.password;
        if (user.email == null || user.email == undefined) {
            delete user.email;
        }
        if (user.phone == null || user.phone == undefined) {
            delete user.phone;
        }
        return user;
    }
    async signin(signInDto) {
        let UserExist;
        if (signInDto.email) {
            UserExist = await this.usersRepository.createQueryBuilder("users")
                .addSelect('users.password').where("users.email=:email", { email: signInDto.email })
                .getOne();
        }
        else if (signInDto.phone) {
            UserExist = await this.usersRepository.createQueryBuilder("users")
                .addSelect('users.password').where("users.phone=:phone", { phone: signInDto.phone })
                .getOne();
        }
        else {
            throw new common_1.BadRequestException("Please provide either email or phone number to sign in.");
        }
        if (!UserExist) {
            throw new common_1.BadRequestException("bro you got nothing in here man");
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(signInDto.password, UserExist.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException("bro yoo this password is incorrect man");
        }
        delete UserExist.password;
        return UserExist;
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.BadRequestException("nigga i cant find no mufucking id like this here");
        }
        return user;
    }
    async update(userId, updateUserDto) {
        console.log('DEBUG: Incoming updateUserDto:', updateUserDto);
        console.log('DEBUG: Incoming userId:', userId);
        const user = await this.findOne(userId);
        console.log('DEBUG: User fetched from DB (before assign):', user);
        if (!user)
            throw new common_1.BadRequestException("no userfound");
        Object.assign(user, updateUserDto);
        console.log('DEBUG: User object after Object.assign (before save):', user);
        await this.usersRepository.save(user);
        console.log('DEBUG: User object after save (final log):', user);
        console.log(user);
        return `User #${userId} updated successfully`;
    }
    remove(id) {
        return `This action removes a #${id} updated `;
    }
    FindUserByEmail(email) {
        return this.usersRepository.findOneBy({ email });
    }
    async changePassword(id, oldPassword, newpassword) {
        const user = await this.usersRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.id = :id", { id })
            .getOne();
        if (!user) {
            throw new common_1.BadRequestException("nigga i cant find no mufucking id here get lost");
        }
        console.log('Incoming oldPassword:', oldPassword);
        console.log('User from DB:', user);
        console.log('User password in DB:', user.password);
        const isPasswordValid = await (0, bcrypt_1.compare)(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        const hasheddpassword = await (0, bcrypt_1.hash)(newpassword, 10);
        user.password = hasheddpassword;
        await this.usersRepository.save(user);
        delete user.password;
        return { message: "Password changed successfully" };
    }
    async accessToken(user) {
        return (0, jsonwebtoken_1.sign)({ id: user.id,
            email: user.email,
            phone: user.phone
        }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "30m" });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EMailService,
        central_logger_1.CentralLoggerService])
], UserService);
//# sourceMappingURL=user.service.js.map