 import { Injectable, CanActivate, ExecutionContext, ForbiddenException, mixin } from '@nestjs/common';
 import { Reflector } from '@nestjs/core';

// @Injectable()
// export class AllowedGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>('alloweroles', context.getHandler());
//     if (!requiredRoles) return true;

//     const request = context.switchToHttp().getRequest();
//     const userRoles: string[] = request?.currentUser?.roles || [];

//     const hasRole = userRoles.some(role => requiredRoles.includes(role));

//     if (!hasRole) {
//       throw new ForbiddenException('Access denied: fuck you you want to come through the back door right oono boy');
//     }

//     return true;
//   }
// }
 
export const AllowedGuard =(requiredRoles:string[])=>{
class RolesGuardMixin implements CanActivate{
   canActivate(context: ExecutionContext): boolean {
     if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const userRoles: string[] = request?.currentUser?.roles || [];

    const hasRole = userRoles.some(role => requiredRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Access denied: fuck you you want to come through the back door right oono boy');
    }

    return true;
  }
}

return mixin(RolesGuardMixin)


   }
  



