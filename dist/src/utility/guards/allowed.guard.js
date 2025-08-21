"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedGuard = void 0;
const common_1 = require("@nestjs/common");
const AllowedGuard = (requiredRoles) => {
    class RolesGuardMixin {
        canActivate(context) {
            if (!requiredRoles)
                return true;
            const request = context.switchToHttp().getRequest();
            const userRoles = request?.currentUser?.roles || [];
            const hasRole = userRoles.some(role => requiredRoles.includes(role));
            if (!hasRole) {
                throw new common_1.ForbiddenException('Access denied: fuck you you want to come through the back door right oono boy');
            }
            return true;
        }
    }
    return (0, common_1.mixin)(RolesGuardMixin);
};
exports.AllowedGuard = AllowedGuard;
//# sourceMappingURL=allowed.guard.js.map