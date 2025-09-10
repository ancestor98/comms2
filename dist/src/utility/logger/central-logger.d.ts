import { LoggerService } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
    VERBOSE = "verbose",
    FATAL = "fatal"
}
export declare enum LogCategory {
    AUTHENTICATION = "authentication",
    AUTHORIZATION = "authorization",
    TRANSACTION = "transaction",
    PAYMENT = "payment",
    USER = "user",
    ACCOUNT = "account",
    BILL = "bill",
    VTU = "vtu",
    TRANSFER = "transfer",
    SAVINGS = "savings",
    COMMISSION = "commission",
    WEBHOOK = "webhook",
    API = "api",
    DATABASE = "database",
    EXTERNAL_SERVICE = "external_service",
    SYSTEM = "system",
    SECURITY = "security",
    PERFORMANCE = "performance",
    BUSINESS_LOGIC = "business_logic",
    VALIDATION = "validation",
    NOTIFICATION = "notification",
    FILE_UPLOAD = "file_upload",
    CRON = "cron",
    EVENT = "event",
    ANALYTICS = "analytics",
    FRAUD = "fraud",
    SANCTIONS = "sanctions",
    METRICS = "metrics"
}
export interface LogContext {
    traceId?: string;
    userId?: string;
    sessionId?: string;
    requestId?: string;
    transactionId?: string;
    productId?: string;
    providerId?: string;
    ipAddress?: string;
    userAgent?: string;
    endpoint?: string;
    method?: string;
    duration?: number;
    statusCode?: number;
    errorCode?: string;
    metadata?: Record<string, any>;
    [key: string]: any;
}
export interface StructuredLogData {
    timestamp: string;
    level: LogLevel;
    category: LogCategory;
    message: string;
    context: LogContext;
    data?: any;
    error?: {
        name: string;
        message: string;
        stack?: string;
        code?: string;
    };
}
export declare class CentralLoggerService implements LoggerService {
    private readonly logger;
    private readonly serviceName;
    private readonly version;
    constructor(logger: PinoLogger);
    private generateTraceId;
    private createStructuredLog;
    private logStructured;
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
    fatal(message: any, context?: string): void;
    logAuth(message: string, context?: LogContext, data?: any): void;
    logAuthError(message: string, error: Error, context?: LogContext): void;
    logTransaction(message: string, context?: LogContext, data?: any): void;
    logTransactionError(message: string, error: Error, context?: LogContext): void;
    logPayment(message: string, context?: LogContext, data?: any): void;
    logPaymentError(message: string, error: Error, context?: LogContext): void;
    logUser(message: string, context?: LogContext, data?: any): void;
    logUserError(message: string, error: Error, context?: LogContext): void;
    logBill(message: string, context?: LogContext, data?: any): void;
    logBillError(message: string, error: Error, context?: LogContext): void;
    logVtu(message: string, context?: LogContext, data?: any): void;
    logVtuError(message: string, error: Error, context?: LogContext): void;
    logTransfer(message: string, context?: LogContext, data?: any): void;
    logTransferError(message: string, error: Error, context?: LogContext): void;
    logSavings(message: string, context?: LogContext, data?: any): void;
    logSavingsError(message: string, error: Error, context?: LogContext): void;
    logCommission(message: string, context?: LogContext, data?: any): void;
    logCommissionError(message: string, error: Error, context?: LogContext): void;
    logWebhook(message: string, context?: LogContext, data?: any): void;
    logWebhookError(message: string, error: Error, context?: LogContext): void;
    logApi(message: string, context?: LogContext, data?: any): void;
    logApiError(message: string, error: Error, context?: LogContext): void;
    logDatabase(message: string, context?: LogContext, data?: any): void;
    logDatabaseError(message: string, error: Error, context?: LogContext): void;
    logExternalService(message: string, context?: LogContext, data?: any): void;
    logExternalServiceError(message: string, error: Error, context?: LogContext): void;
    logSecurity(message: string, context?: LogContext, data?: any): void;
    logSecurityError(message: string, error: Error, context?: LogContext): void;
    logPerformance(message: string, context?: LogContext, data?: any): void;
    logPerformanceError(message: string, error: Error, context?: LogContext): void;
    logBusinessLogic(message: string, context?: LogContext, data?: any): void;
    logBusinessLogicError(message: string, error: Error, context?: LogContext): void;
    logValidation(message: string, context?: LogContext, data?: any): void;
    logValidationError(message: string, error: Error, context?: LogContext): void;
    logNotification(message: string, context?: LogContext, data?: any): void;
    logNotificationError(message: string, error: Error, context?: LogContext): void;
    logFileUpload(message: string, context?: LogContext, data?: any): void;
    logFileUploadError(message: string, error: Error, context?: LogContext): void;
    logCron(message: string, context?: LogContext, data?: any): void;
    logCronError(message: string, error: Error, context?: LogContext): void;
    logEvent(message: string, context?: LogContext, data?: any): void;
    logEventError(message: string, error: Error, context?: LogContext): void;
    logAnalytics(message: string, context?: LogContext, data?: any): void;
    logAnalyticsError(message: string, error: Error, context?: LogContext): void;
    logFraud(message: string, context?: LogContext, data?: any): void;
    logFraudError(message: string, error: Error, context?: LogContext): void;
    logSanctions(message: string, context?: LogContext, data?: any): void;
    logSanctionsError(message: string, error: Error, context?: LogContext): void;
    logMetrics(message: string, context?: LogContext, data?: any): void;
    logMetricsError(message: string, error: Error, context?: LogContext): void;
    logCustom(level: LogLevel, category: LogCategory, message: string, context?: LogContext, data?: any, error?: Error): void;
    createChildLogger(additionalContext: LogContext): CentralLoggerService;
}
