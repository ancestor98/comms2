import { ConfigService } from '@nestjs/config';
export declare class SentryTrackerService {
    private readonly configService;
    private static instance;
    private readonly logger;
    constructor(configService: ConfigService);
    static getInstance(): SentryTrackerService;
    captureException(error: any): void;
    captureMessage(message: string): void;
}
