import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { inject } from '@angular/core';

export const initialTestGuard: CanActivateFn = () => {
	const tokenService = inject(TokenService);
	const router = inject(Router);

	if (!tokenService.isFirstLogin()) return true;

	// Todavía no completó el VARK
	router.navigate(['/alumno']);
	return false;
};
