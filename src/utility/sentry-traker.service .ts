import { Injectable ,Logger} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';
import { getSentryConfigName, SentryConfig } from 'src/config/sentry.config';
import { handleAndThrowError } from './error.util';
//import { handleAndThrowError } from 'src/utils/error.utils';

@Injectable()
export class SentryTrackerService {
  private static instance: SentryTrackerService;
  private readonly logger= new Logger(SentryTrackerService.name)

  constructor(private readonly configService: ConfigService) {
    if (!SentryTrackerService.instance) {
      const config = this.configService.get<SentryConfig>(
        getSentryConfigName(),
      );
      if(!config?.dsn){
        this.logger.warn('⚠️ Sentry DSN not configured. Skipping initialization.');
        return
      }
      Sentry.init({
        dsn: config.dsn,
        tracesSampleRate: 1.0, // Adjust this rate for performance monitoring
      });
       this.logger.log('✅ Sentry initialized successfully');

      SentryTrackerService.instance = this;
    }
  }

  static getInstance(): SentryTrackerService {
    if (!SentryTrackerService.instance) {
      return handleAndThrowError(
 new Error('SentryTrackerService has not been initialized yet.'),
        null,
        'SentryTrackerService has not been initialized yet.',
      );
    }
    return SentryTrackerService.instance;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captureException(error: any) {
    Sentry.captureException(error);
  }

  captureMessage(message: string) {
    Sentry.captureMessage(message);
  }
}
