import type { Logger } from 'nestjs-pino';
export declare function handleAndThrowError(error: unknown, logger?: Logger | null, fallbackMessage?: string, errorstatus?: number, publishToSentry?: boolean, loggerMessage?: string): never;
export declare const getErrorMessage: (err: any) => any;
export declare const getErrorStatusCode: (err: any) => number;
