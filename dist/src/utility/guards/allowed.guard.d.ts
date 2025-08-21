import { ExecutionContext } from '@nestjs/common';
export declare const AllowedGuard: (requiredRoles: string[]) => import("@nestjs/common").Type<{
    canActivate(context: ExecutionContext): boolean;
}>;
