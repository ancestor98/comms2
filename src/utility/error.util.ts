import type { Logger } from 'nestjs-pino';
import { SentryTrackerService } from './sentry-traker.service ';
import { HttpException, HttpStatus } from '@nestjs/common';
export function handleAndThrowError(
    error:unknown,
    logger:Logger|null= null,
    fallbackMessage="oboy something is wrong",
    errorstatus?:number,
    publishToSentry=false,
    loggerMessage="an unexpected error occured",
): never {
  if (publishToSentry) {
    try {
      const sentryTracker = SentryTrackerService.getInstance();
      sentryTracker?.captureException?.(error);
    } catch (sentryError) {
        if(logger){
            logger.warn("failed to send error to sentry",sentryError)
        }


    }

  } if (error instanceof HttpException) {
    if (logger) {
      logger.error({ err: error, stack: error.stack }, error.message);
    }
    // eslint-disable-next-line no-restricted-syntax
    throw error;
  }

  const stack = error instanceof Error ? error.stack : undefined;
  if (logger) {
    logger.error(
      {
        err: error,
        stack,
        status: errorstatus ?? HttpStatus.INTERNAL_SERVER_ERROR,
      },
      loggerMessage ?? fallbackMessage,
    );
  }
  // eslint-disable-next-line residential/use-handle-and-throw-error
  throw new HttpException(
    fallbackMessage,
    errorstatus ?? HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (err: any) => {
  if (err instanceof HttpException) return err;
  return err?.errors?.[0]?.message ?? "cant say!!";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorStatusCode = (err: any): number => {
  if (err instanceof HttpException) {
    return err.getStatus();
  }
  return HttpStatus.INTERNAL_SERVER_ERROR
};



