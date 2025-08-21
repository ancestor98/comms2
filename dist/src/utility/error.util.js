"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorStatusCode = exports.getErrorMessage = void 0;
exports.handleAndThrowError = handleAndThrowError;
const sentry_traker_service_1 = require("./sentry-traker.service ");
const common_1 = require("@nestjs/common");
function handleAndThrowError(error, logger = null, fallbackMessage = "oboy something is wrong", errorstatus, publishToSentry = false, loggerMessage = "an unexpected error occured") {
    if (publishToSentry) {
        try {
            const sentryTracker = sentry_traker_service_1.SentryTrackerService.getInstance();
            sentryTracker?.captureException?.(error);
        }
        catch (sentryError) {
            if (logger) {
                logger.warn("failed to send error to sentry", sentryError);
            }
        }
    }
    if (error instanceof common_1.HttpException) {
        if (logger) {
            logger.error({ err: error, stack: error.stack }, error.message);
        }
        throw error;
    }
    const stack = error instanceof Error ? error.stack : undefined;
    if (logger) {
        logger.error({
            err: error,
            stack,
            status: errorstatus ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        }, loggerMessage ?? fallbackMessage);
    }
    throw new common_1.HttpException(fallbackMessage, errorstatus ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
}
const getErrorMessage = (err) => {
    if (err instanceof common_1.HttpException)
        return err;
    return err?.errors?.[0]?.message ?? "cant say!!";
};
exports.getErrorMessage = getErrorMessage;
const getErrorStatusCode = (err) => {
    if (err instanceof common_1.HttpException) {
        return err.getStatus();
    }
    return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
};
exports.getErrorStatusCode = getErrorStatusCode;
//# sourceMappingURL=error.util.js.map