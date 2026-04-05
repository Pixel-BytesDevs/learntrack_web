import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../infraestructure/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TrackuiInputComponent } from '../../../shared/trackui/trackui-input/trackui-input.component';
import { TrackuiButtonDirective } from '../../../shared/trackui/trackui-button/trackui-button.directive';
import { TrackuiSocialButtonDirective } from '../../../shared/trackui/trackui-button-social-login/trackui-button-social-login.directive';
import { TrackuiCheckboxComponent } from '../../../shared/trackui/trackui-checkbox/trackui-checkbox.component';
import { TokenService } from '../../../../infraestructure/services/token/token.service';

@Component({
	selector: 'app-login',
	imports: [
		RouterLink,
		TrackuiInputComponent,
		TrackuiButtonDirective,
		ReactiveFormsModule,
		TrackuiSocialButtonDirective,
		TrackuiCheckboxComponent,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private tokenService = inject(TokenService);
	private router = inject(Router);

	loading = false;
	errorMsg: string | null = null;

	form = this.fb.nonNullable.group({
		email: ['', [Validators.required]],
		password: ['', [Validators.required]],
	});

	get email() {
		return this.form.controls.email;
	}
	get password() {
		return this.form.controls.password;
	}

	// Botón Google → flujo PKCE con idp=google, Spring redirige directo a Google
	async loginWithGoogle(): Promise<void> {
		await this.authService.loginWithGoogle();
	}

	// Formulario email/password → POST /auth/login → tokens directos
	submit(): void {
		if (this.form.invalid || this.loading) {
			this.form.markAllAsTouched();
			return;
		}

		this.loading = true;
		this.errorMsg = null;

		const { email, password } = this.form.getRawValue();

		this.authService.login({ username: email, password }).subscribe({
			next: (res) => {
				this.tokenService.setTokens(res.access_token, res.refresh_token);
				this.redirectByRole();
			},
			error: (err) => {
				this.errorMsg =
					err?.error?.message || 'Correo o contraseña incorrectos';
				this.loading = false;
			},
			complete: () => {
				this.loading = false;
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
			this.router.navigate(firstLogin ? ['/alumno'] : ['/aula/dashboard']);
		} else {
			this.router.navigate(['/']);
		}
	}
}
