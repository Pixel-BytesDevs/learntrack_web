import { Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../infraestructure/services/auth/auth.service';
import { TokenService } from '../../infraestructure/services/token/token.service';

@Component({
	selector: 'app-authorized',
	template: '<p>Iniciando sesión...</p>',
	imports: [],
	templateUrl: './authorized.component.html',
	styleUrl: './authorized.component.scss',
})
export class AuthorizedComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private authService = inject(AuthService);
	private tokenService = inject(TokenService);
	private router = inject(Router);

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			const code = params['code'];
			console.log("Mensaje, ");
			if (code) {
				this.exchangeCode(code);
			} else {
				// No hay code, algo salió mal → volver al home
				this.router.navigate(['/']);
			}
		});
	}

	private exchangeCode(code: string): void {
		this.authService.getToken(code).subscribe({
			next: (data) => {
				this.tokenService.setTokens(data.access_token, data.refresh_token);
				this.redirectByRole();
			},
			error: (err) => {
				console.error('Error al obtener token:', err);
				this.router.navigate(['/']);
			},
		});
	}

	private redirectByRole(): void {
		const roles = this.tokenService.getRoles();
		const firstLogin = this.tokenService.isFirstLogin();

		if (roles.includes('ROLE_ADMIN')) {
			this.router.navigate(['/admin/dashboard']);
		} else if (roles.includes('ROLE_PROFESOR')) {
			this.router.navigate(['/profesor/dashboard']);
		} else if (roles.includes('ROLE_USER')) {
			// Primer login → test VARK, luego → área de aula
			this.router.navigate(firstLogin ? ['/alumno'] : ['/alumno']);
		} else {
			this.router.navigate(['/']);
		}
	}
}
