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
var CentralLoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentralLoggerService = exports.LogCategory = exports.LogLevel = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const uuid_1 = require("uuid");
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
    LogLevel["VERBOSE"] = "verbose";
    LogLevel["FATAL"] = "fatal";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var LogCategory;
(function (LogCategory) {
    LogCategory["AUTHENTICATION"] = "authentication";
    LogCategory["AUTHORIZATION"] = "authorization";
    LogCategory["TRANSACTION"] = "transaction";
    LogCategory["PAYMENT"] = "payment";
    LogCategory["USER"] = "user";
    LogCategory["ACCOUNT"] = "account";
    LogCategory["BILL"] = "bill";
    LogCategory["VTU"] = "vtu";
    LogCategory["TRANSFER"] = "transfer";
    LogCategory["SAVINGS"] = "savings";
    LogCategory["COMMISSION"] = "commission";
    LogCategory["WEBHOOK"] = "webhook";
    LogCategory["API"] = "api";
    LogCategory["DATABASE"] = "database";
    LogCategory["EXTERNAL_SERVICE"] = "external_service";
    LogCategory["SYSTEM"] = "system";
    LogCategory["SECURITY"] = "security";
    LogCategory["PERFORMANCE"] = "performance";
    LogCategory["BUSINESS_LOGIC"] = "business_logic";
    LogCategory["VALIDATION"] = "validation";
    LogCategory["NOTIFICATION"] = "notification";
    LogCategory["FILE_UPLOAD"] = "file_upload";
    LogCategory["CRON"] = "cron";
    LogCategory["EVENT"] = "event";
    LogCategory["ANALYTICS"] = "analytics";
    LogCategory["FRAUD"] = "fraud";
    LogCategory["SANCTIONS"] = "sanctions";
    LogCategory["METRICS"] = "metrics";
})(LogCategory || (exports.LogCategory = LogCategory = {}));
let CentralLoggerService = CentralLoggerService_1 = class CentralLoggerService {
    constructor(logger) {
        this.serviceName = 'my commence';
        this.version = '2.00';
        this.logger = logger;
    }
    generateTraceId() {
        return (0, uuid_1.v4)();
    }
    createStructuredLog(level, category, message, context = {}, data, error) {
        const timestamp = new Date().toISOString();
        return {
            timestamp,
            level,
            category,
            message,
            context: {
                traceId: context.traceId || this.generateTraceId(),
                ...context,
            },
            data,
            error: error
                ? {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    code: error.code,
                }
                : undefined,
        };
    }
    logStructured(level, category, message, context = {}, data, error) {
        const structuredLog = this.createStructuredLog(level, category, message, context, data, error);
        const logEntry = {
            service: this.serviceName,
            version: this.version,
            environment: process.env.NODE_ENV || 'development',
            ...structuredLog,
        };
        switch (level) {
            case LogLevel.ERROR:
                this.logger.error(logEntry);
                break;
            case LogLevel.WARN:
                this.logger.warn(logEntry);
                break;
            case LogLevel.INFO:
                this.logger.info(logEntry);
                break;
            case LogLevel.DEBUG:
                this.logger.debug(logEntry);
                break;
            case LogLevel.VERBOSE:
                this.logger.trace(logEntry);
                break;
            case LogLevel.FATAL:
                this.logger.fatal(logEntry);
                break;
            default:
                this.logger.info(logEntry);
        }
    }
    log(message, context) {
        this.logStructured(LogLevel.INFO, LogCategory.SYSTEM, message, {});
    }
    error(message, trace, context) {
        this.logStructured(LogLevel.ERROR, LogCategory.SYSTEM, message, {}, undefined, new Error(trace || message));
    }
    warn(message, context) {
        this.logStructured(LogLevel.WARN, LogCategory.SYSTEM, message, {});
    }
    debug(message, context) {
        this.logStructured(LogLevel.DEBUG, LogCategory.SYSTEM, message, {});
    }
    verbose(message, context) {
        this.logStructured(LogLevel.VERBOSE, LogCategory.SYSTEM, message, {});
    }
    fatal(message, context) {
        this.logStructured(LogLevel.FATAL, LogCategory.SYSTEM, message, {});
    }
    logAuth(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.AUTHENTICATION, message, context, data);
    }
    logAuthError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.AUTHENTICATION, message, context, undefined, error);
    }
    logTransaction(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.TRANSACTION, message, context, data);
    }
    logTransactionError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.TRANSACTION, message, context, undefined, error);
    }
    logPayment(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.PAYMENT, message, context, data);
    }
    logPaymentError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.PAYMENT, message, context, undefined, error);
    }
    logUser(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.USER, message, context, data);
    }
    logUserError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.USER, message, context, undefined, error);
    }
    logBill(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.BILL, message, context, data);
    }
    logBillError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.BILL, message, context, undefined, error);
    }
    logVtu(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.VTU, message, context, data);
    }
    logVtuError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.VTU, message, context, undefined, error);
    }
    logTransfer(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.TRANSFER, message, context, data);
    }
    logTransferError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.TRANSFER, message, context, undefined, error);
    }
    logSavings(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.SAVINGS, message, context, data);
    }
    logSavingsError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.SAVINGS, message, context, undefined, error);
    }
    logCommission(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.COMMISSION, message, context, data);
    }
    logCommissionError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.COMMISSION, message, context, undefined, error);
    }
    logWebhook(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.WEBHOOK, message, context, data);
    }
    logWebhookError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.WEBHOOK, message, context, undefined, error);
    }
    logApi(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.API, message, context, data);
    }
    logApiError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.API, message, context, undefined, error);
    }
    logDatabase(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.DATABASE, message, context, data);
    }
    logDatabaseError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.DATABASE, message, context, undefined, error);
    }
    logExternalService(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.EXTERNAL_SERVICE, message, context, data);
    }
    logExternalServiceError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.EXTERNAL_SERVICE, message, context, undefined, error);
    }
    logSecurity(message, context = {}, data) {
        this.logStructured(LogLevel.WARN, LogCategory.SECURITY, message, context, data);
    }
    logSecurityError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.SECURITY, message, context, undefined, error);
    }
    logPerformance(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.PERFORMANCE, message, context, data);
    }
    logPerformanceError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.PERFORMANCE, message, context, undefined, error);
    }
    logBusinessLogic(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.BUSINESS_LOGIC, message, context, data);
    }
    logBusinessLogicError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.BUSINESS_LOGIC, message, context, undefined, error);
    }
    logValidation(message, context = {}, data) {
        this.logStructured(LogLevel.WARN, LogCategory.VALIDATION, message, context, data);
    }
    logValidationError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.VALIDATION, message, context, undefined, error);
    }
    logNotification(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.NOTIFICATION, message, context, data);
    }
    logNotificationError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.NOTIFICATION, message, context, undefined, error);
    }
    logFileUpload(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.FILE_UPLOAD, message, context, data);
    }
    logFileUploadError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.FILE_UPLOAD, message, context, undefined, error);
    }
    logCron(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.CRON, message, context, data);
    }
    logCronError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.CRON, message, context, undefined, error);
    }
    logEvent(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.EVENT, message, context, data);
    }
    logEventError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.EVENT, message, context, undefined, error);
    }
    logAnalytics(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.ANALYTICS, message, context, data);
    }
    logAnalyticsError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.ANALYTICS, message, context, undefined, error);
    }
    logFraud(message, context = {}, data) {
        this.logStructured(LogLevel.WARN, LogCategory.FRAUD, message, context, data);
    }
    logFraudError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.FRAUD, message, context, undefined, error);
    }
    logSanctions(message, context = {}, data) {
        this.logStructured(LogLevel.WARN, LogCategory.SANCTIONS, message, context, data);
    }
    logSanctionsError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.SANCTIONS, message, context, undefined, error);
    }
    logMetrics(message, context = {}, data) {
        this.logStructured(LogLevel.INFO, LogCategory.METRICS, message, context, data);
    }
    logMetricsError(message, error, context = {}) {
        this.logStructured(LogLevel.ERROR, LogCategory.METRICS, message, context, undefined, error);
    }
    logCustom(level, category, message, context = {}, data, error) {
        this.logStructured(level, category, message, context, data, error);
    }
    createChildLogger(additionalContext) {
        const childLogger = new CentralLoggerService_1(this.logger);
        return childLogger;
    }
};
exports.CentralLoggerService = CentralLoggerService;
exports.CentralLoggerService = CentralLoggerService = CentralLoggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_pino_1.PinoLogger])
], CentralLoggerService);
//# sourceMappingURL=central-logger.js.map