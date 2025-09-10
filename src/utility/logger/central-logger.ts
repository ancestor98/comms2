import { Injectable, LoggerService } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { v4 as uuidv4 } from 'uuid';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
  FATAL = 'fatal',
}
export enum LogCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  TRANSACTION = 'transaction',
  PAYMENT = 'payment',
  USER = 'user',
  ACCOUNT = 'account',
  BILL = 'bill',
  VTU = 'vtu',
  TRANSFER = 'transfer',
  SAVINGS = 'savings',
  COMMISSION = 'commission',
  WEBHOOK = 'webhook',
  API = 'api',
  DATABASE = 'database',
  EXTERNAL_SERVICE = 'external_service',
  SYSTEM = 'system',
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  BUSINESS_LOGIC = 'business_logic',
  VALIDATION = 'validation',
  NOTIFICATION = 'notification',
  FILE_UPLOAD = 'file_upload',
  CRON = 'cron',
  EVENT = 'event',
  ANALYTICS = 'analytics',
  FRAUD = 'fraud',
  SANCTIONS = 'sanctions',
  METRICS = 'metrics',
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
[key: string]: any; // Allow additional properties
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
@Injectable()
export class CentralLoggerService implements LoggerService{
    private readonly logger:PinoLogger;
    private readonly serviceName= 'my commence'
    private readonly version='2.00'

    constructor(logger:PinoLogger){
        this.logger= logger
    }
    private generateTraceId(): string {
    return uuidv4()
  }

  /**
   * Create structured log data with consistent format
   */
  private createStructuredLog(
    level: LogLevel,
    category: LogCategory,
    message: string,
    context: LogContext = {},
    data?: any,
    error?: Error,
  ): StructuredLogData {
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
            code: (error as any).code,
          }
        : undefined,
    };
  }

  /**
   * Log with structured format
   */
  private logStructured(
    level: LogLevel,
    category: LogCategory,
    message: string,
    context: LogContext = {},
    data?: any,
    error?: Error,
  ): void {
    const structuredLog = this.createStructuredLog(
      level,
      category,
      message,
      context,
      data,
      error,
    );

    // Add service metadata
    const logEntry = {
      service: this.serviceName,
      version: this.version,
      environment: process.env.NODE_ENV || 'development',
      ...structuredLog,
    };

    switch(level){
        case LogLevel.ERROR:
            this.logger.error(logEntry);
            break
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
  
  // Standard logger interface methods
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  log(message: any, context?: string): void {
    this.logStructured(LogLevel.INFO, LogCategory.SYSTEM, message, {});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  error(message: any, trace?: string, context?: string): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.SYSTEM,
      message,
      {},
      undefined,
      new Error(trace || message),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  warn(message: any, context?: string): void {
    this.logStructured(LogLevel.WARN, LogCategory.SYSTEM, message, {});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  debug(message: any, context?: string): void {
    this.logStructured(LogLevel.DEBUG, LogCategory.SYSTEM, message, {});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  verbose(message: any, context?: string): void {
    this.logStructured(LogLevel.VERBOSE, LogCategory.SYSTEM, message, {});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  fatal(message: any, context?: string): void {
    this.logStructured(LogLevel.FATAL, LogCategory.SYSTEM, message, {});
  }

  // Category-specific logging methods
  logAuth(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.AUTHENTICATION,
      message,
      context,
      data,
    );
  }

  logAuthError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.AUTHENTICATION,
      message,
      context,
      undefined,
      error,
    );
  }

  logTransaction(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.TRANSACTION,
      message,
      context,
      data,
    );
  }

  logTransactionError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.TRANSACTION,
      message,
      context,
      undefined,
      error,
    );
  }

  logPayment(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.PAYMENT,
      message,
      context,
      data,
    );
  }

  logPaymentError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.PAYMENT,
      message,
      context,
      undefined,
      error,
    );
  }

  logUser(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(LogLevel.INFO, LogCategory.USER, message, context, data);
  }

  logUserError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.USER,
      message,
      context,
      undefined,
      error,
    );
  }

  logBill(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(LogLevel.INFO, LogCategory.BILL, message, context, data);
  }

  logBillError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.BILL,
      message,
      context,
      undefined,
      error,
    );
  }

  logVtu(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(LogLevel.INFO, LogCategory.VTU, message, context, data);
  }

  logVtuError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.VTU,
      message,
      context,
      undefined,
      error,
    );
  }

  logTransfer(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.TRANSFER,
      message,
      context,
      data,
    );
  }

  logTransferError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.TRANSFER,
      message,
      context,
      undefined,
      error,
    );
  }

  logSavings(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.SAVINGS,
      message,
      context,
      data,
    );
  }

  logSavingsError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.SAVINGS,
      message,
      context,
      undefined,
      error,
    );
  }

  logCommission(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.COMMISSION,
      message,
      context,
      data,
    );
  }

  logCommissionError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.COMMISSION,
      message,
      context,
      undefined,
      error,
    );
  }

  logWebhook(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.WEBHOOK,
      message,
      context,
      data,
    );
  }

  logWebhookError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.WEBHOOK,
      message,
      context,
      undefined,
      error,
    );
  }

  logApi(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(LogLevel.INFO, LogCategory.API, message, context, data);
  }

  logApiError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.API,
      message,
      context,
      undefined,
      error,
    );
  }

  logDatabase(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.DATABASE,
      message,
      context,
      data,
    );
  }

  logDatabaseError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.DATABASE,
      message,
      context,
      undefined,
      error,
    );
  }

  logExternalService(
    message: string,
    context: LogContext = {},
    data?: any,
  ): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.EXTERNAL_SERVICE,
      message,
      context,
      data,
    );
  }

  logExternalServiceError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.EXTERNAL_SERVICE,
      message,
      context,
      undefined,
      error,
    );
  }

  logSecurity(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.WARN,
      LogCategory.SECURITY,
      message,
      context,
      data,
    );
  }

  logSecurityError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.SECURITY,
      message,
      context,
      undefined,
      error,
    );
  }

  logPerformance(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.PERFORMANCE,
      message,
      context,
      data,
    );
  }

  logPerformanceError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.PERFORMANCE,
      message,
      context,
      undefined,
      error,
    );
  }

  logBusinessLogic(
    message: string,
    context: LogContext = {},
    data?: any,
  ): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.BUSINESS_LOGIC,
      message,
      context,
      data,
    );
  }

  logBusinessLogicError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.BUSINESS_LOGIC,
      message,
      context,
      undefined,
      error,
    );
  }

  logValidation(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.WARN,
      LogCategory.VALIDATION,
      message,
      context,
      data,
    );
  }

  logValidationError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.VALIDATION,
      message,
      context,
      undefined,
      error,
    );
  }

  logNotification(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.NOTIFICATION,
      message,
      context,
      data,
    );
  }

  logNotificationError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.NOTIFICATION,
      message,
      context,
      undefined,
      error,
    );
  }

  logFileUpload(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.FILE_UPLOAD,
      message,
      context,
      data,
    );
  }

  logFileUploadError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.FILE_UPLOAD,
      message,
      context,
      undefined,
      error,
    );
  }

  logCron(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(LogLevel.INFO, LogCategory.CRON, message, context, data);
  }

  logCronError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.CRON,
      message,
      context,
      undefined,
      error,
    );
  }

  logEvent(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.EVENT,
      message,
      context,
      data,
    );
  }

  logEventError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.EVENT,
      message,
      context,
      undefined,
      error,
    );
  }

  logAnalytics(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.ANALYTICS,
      message,
      context,
      data,
    );
  }

  logAnalyticsError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.ANALYTICS,
      message,
      context,
      undefined,
      error,
    );
  }

  logFraud(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.WARN,
      LogCategory.FRAUD,
      message,
      context,
      data,
    );
  }

  logFraudError(message: string, error: Error, context: LogContext = {}): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.FRAUD,
      message,
      context,
      undefined,
      error,
    );
  }

  logSanctions(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.WARN,
      LogCategory.SANCTIONS,
      message,
      context,
      data,
    );
  }

  logSanctionsError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.SANCTIONS,
      message,
      context,
      undefined,
      error,
    );
  }

  logMetrics(message: string, context: LogContext = {}, data?: any): void {
    this.logStructured(
      LogLevel.INFO,
      LogCategory.METRICS,
      message,
      context,
      data,
    );
  }

  logMetricsError(
    message: string,
    error: Error,
    context: LogContext = {},
  ): void {
    this.logStructured(
      LogLevel.ERROR,
      LogCategory.METRICS,
      message,
      context,
      undefined,
      error,
    );
  }

  // Generic method for custom categories
  logCustom(
    level: LogLevel,
    category: LogCategory,
    message: string,
    context: LogContext = {},
    data?: any,
    error?: Error,
  ): void {
    this.logStructured(level, category, message, context, data, error);
  }

  // Method to create a child logger with inherited context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  createChildLogger(additionalContext: LogContext): CentralLoggerService {
    const childLogger = new CentralLoggerService(this.logger);
    // Inherit context from parent and merge with additional context
    return childLogger;
  }
}

    


