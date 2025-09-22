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
exports.EMailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let EMailService = class EMailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST'),
            port: +this.configService.get('EMAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
            tls: {
                rejectUnauthorized: false,
            },
            logger: false,
            debug: false,
        });
    }
    async sendMail(dto) {
        const { recipient, subject, text, html, timestamp } = dto;
        const options = {
            from: this.configService.get('EMAIL_USER'),
            to: recipient,
            subject,
            text,
            html,
            timestamp
        };
        try {
            const info = await this.transporter.sendMail(options);
            console.log('✅ Email sent:', info.messageId);
            return true;
        }
        catch (error) {
            console.error('❌ Error sending email:', error?.message || error);
            return false;
        }
    }
};
exports.EMailService = EMailService;
exports.EMailService = EMailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EMailService);
//# sourceMappingURL=email.service.js.map