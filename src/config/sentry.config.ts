import { registerAs } from "@nestjs/config";
export type SentryConfig = {
  dsn: string;
};

const getSentryConfig = (): SentryConfig => ({
  dsn: process.env.SENTRY_DSN,
});
export const getSentryConfigName = () => 'sentry';

export default registerAs(getSentryConfigName(), getSentryConfig);
