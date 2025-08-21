"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedRoles = void 0;
const common_1 = require("@nestjs/common");
const AllowedRoles = (...roles) => (0, common_1.SetMetadata)('alloweroles', roles);
exports.AllowedRoles = AllowedRoles;
//# sourceMappingURL=allowed-roles.decorator.js.map