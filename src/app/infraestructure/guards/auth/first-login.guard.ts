import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "../../services/token/token.service";
import { inject } from "@angular/core";

export const firstLoginGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isFirstLogin()) return true;

  // Ya completó el VARK → redirigir al aula
  router.navigate(['/aula/dashboard']);
  return false;
};