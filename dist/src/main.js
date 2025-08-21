"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const logger = app.get(nestjs_pino_1.Logger);
    app.useLogger(logger);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    const PORT = process.env.PORT ?? 3000;
    try {
        await app.listen(PORT);
        logger.log(`my niggas im on and succsefully on you know boys on ${PORT} tune in`);
    }
    catch (err) {
        logger.log(`this app isnt comming up ${err.message} `);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map