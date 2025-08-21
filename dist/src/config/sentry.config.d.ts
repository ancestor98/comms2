export type SentryConfig = {
    dsn: string;
};
export declare const getSentryConfigName: () => string;
declare const _default: (() => SentryConfig) & import("@nestjs/config").ConfigFactoryKeyHost<SentryConfig>;
export default _default;
