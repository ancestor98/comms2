"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSentryConfigName = void 0;
const config_1 = require("@nestjs/config");
const getSentryConfig = () => ({
    dsn: process.env.SENTRY_DSN,
});
const getSentryConfigName = () => 'sentry';
exports.getSentryConfigName = getSentryConfigName;
exports.default = (0, config_1.registerAs)((0, exports.getSentryConfigName)(), getSentryConfig);
//# sourceMappingURL=sentry.config.js.map