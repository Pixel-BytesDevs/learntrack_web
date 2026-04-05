import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const tokenService = inject(TokenService);

	// No adjuntar token al endpoint de obtención de tokens
	if (req.url.includes('/oauth2/token')) {
		return next(req);
	}

	const token = tokenService.getAccessToken();
	if (!token) return next(req);

	const cloned = req.clone({
		setHeaders: { Authorization: `Bearer ${token}` },
	});

	return next(cloned);
};
