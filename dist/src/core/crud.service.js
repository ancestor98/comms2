"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneOrThrow = findOneOrThrow;
const common_1 = require("@nestjs/common");
async function findOneOrThrow(repo, where, relations, select, errorMessage, exceptionStatus) {
    const findOptions = { where };
    if (select)
        findOptions.select = select;
    if (relations)
        findOptions.relations = relations;
    const record = await repo.findOne(findOptions);
    if (!record) {
        throw new common_1.HttpException(errorMessage ?? " record not found", exceptionStatus ?? common_1.HttpStatus.BAD_REQUEST);
    }
    return record;
}
//# sourceMappingURL=crud.service.js.map