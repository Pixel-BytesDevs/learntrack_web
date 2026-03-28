import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../infraestructure/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TrackuiInputComponent } from '../../../shared/trackui/trackui-input/trackui-input.component';
import { TrackuiButtonDirective } from '../../../shared/trackui/trackui-button/trackui-button.directive';
import { TrackuiSocialButtonDirective } from '../../../shared/trackui/trackui-button-social-login/trackui-button-social-login.directive';
import { TrackuiCheckboxComponent } from '../../../shared/trackui/trackui-checkbox/trackui-checkbox.component';


@Component({
	selector: 'app-login',
	imports: [RouterLink, TrackuiInputComponent, TrackuiButtonDirective,ReactiveFormsModule,TrackuiSocialButtonDirective,TrackuiCheckboxComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);

	loading = false;
	errorMsg: string | null = null;

	form = this.fb.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	});

	//Para acceder desde el html

	get email() {
		return this.form.controls.email;
	}

	get password() {
		return this.form.controls.password;
	}

	submit(): void {
		if (this.form.invalid || this.loading) {
			this.form.markAllAsTouched();
			return;
		}

		this.loading = true;
		this.errorMsg = null;

		const payload = this.form.getRawValue();

		/*this.authService.login(payload).subscribe({
			next: (res) => {
				localStorage.setItem('token', res.token);

				this.router.navigate(['/dashboard']);
			},
			error: (err) => {
				this.errorMsg =
					err?.error?.message || 'Correo o contraseña incorrectos';
				this.loading = false;
			},
			complete: () => {
				this.loading = false;
			},
		});*/
	}
}
