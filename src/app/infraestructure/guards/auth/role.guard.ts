import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	const tokenService = inject(TokenService);
	const router = inject(Router);

	const allowedRoles: string[] = route.data['roles'] ?? [];
	const userRoles = tokenService.getRoles();

	const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
	if (hasAccess) return true;

	// Sin acceso → redirige a su área correspondiente
	if (userRoles.includes('ROLE_ADMIN')) {
		router.navigate(['/admin/dashboard']);
	} else if (userRoles.includes('ROLE_PROFESOR')) {
		router.navigate(['/profesor/dashboard']);
	} else if (userRoles.includes('ROLE_USER')) {
		router.navigate(['/alumno/dashboard']);
	} else {
		router.navigate(['/home']);
	}

	return false;
};
