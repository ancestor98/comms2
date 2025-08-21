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
var SentryTrackerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryTrackerService = void 0;
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const config_1 = require("@nestjs/config");
const sentry_config_1 = require("../config/sentry.config");
const error_util_1 = require("./error.util");
let SentryTrackerService = SentryTrackerService_1 = class SentryTrackerService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(SentryTrackerService_1.name);
        if (!SentryTrackerService_1.instance) {
            const config = this.configService.get((0, sentry_config_1.getSentryConfigName)());
            if (!config?.dsn) {
                this.logger.warn('⚠️ Sentry DSN not configured. Skipping initialization.');
                return;
            }
            Sentry.init({
                dsn: config.dsn,
                tracesSampleRate: 1.0,
            });
            this.logger.log('✅ Sentry initialized successfully');
            SentryTrackerService_1.instance = this;
        }
    }
    static getInstance() {
        if (!SentryTrackerService_1.instance) {
            return (0, error_util_1.handleAndThrowError)(new Error('SentryTrackerService has not been initialized yet.'), null, 'SentryTrackerService has not been initialized yet.');
        }
        return SentryTrackerService_1.instance;
    }
    captureException(error) {
        Sentry.captureException(error);
    }
    captureMessage(message) {
        Sentry.captureMessage(message);
    }
};
exports.SentryTrackerService = SentryTrackerService;
exports.SentryTrackerService = SentryTrackerService = SentryTrackerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SentryTrackerService);
//# sourceMappingURL=sentry-traker.service%20.js.map