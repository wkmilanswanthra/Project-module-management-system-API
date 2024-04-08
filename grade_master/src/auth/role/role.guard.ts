import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRoles: string[]) {
    return userRoles.some((userRole) => roles.includes(userRole));
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Roles required:', roles);
    console.log('User roles:', user.role);

    const isAuthorized = this.matchRoles(roles, user.role);
    console.log('Authorization result:', isAuthorized);

    return isAuthorized;
  }
}
