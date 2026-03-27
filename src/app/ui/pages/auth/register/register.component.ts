import { Component, inject } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { TrackuiInputComponent } from '../../../shared/trackui/trackui-input/trackui-input.component';
import { TrackuiButtonDirective } from '../../../shared/trackui/trackui-button/trackui-button.directive';
import { TrackuiSocialButtonDirective } from '../../../shared/trackui/trackui-button-social-login/trackui-button-social-login.directive';
import { AuthService } from '../../../../infraestructure/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-register',
	imports: [
		ReactiveFormsModule,
		TrackuiInputComponent,
		TrackuiButtonDirective,
		TrackuiSocialButtonDirective,
    RouterLink
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);

	loading = false;
	errorMsg: string | null = null;

	form = this.fb.nonNullable.group(
		{
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
		},
		{
			validators: this.passwordMatchValidator,
		},
	);

	get name() {
		return this.form.controls.name;
	}

	get email() {
		return this.form.controls.email;
	}

	get password() {
		return this.form.controls.password;
	}

	get confirmPassword() {
		return this.form.controls.confirmPassword;
	}

	submit(): void {
		if (this.form.invalid || this.loading) {
			this.form.markAllAsTouched();
			return;
		}

		this.loading = true;
		this.errorMsg = null;

		const { confirmPassword, ...payload } = this.form.getRawValue();

		this.authService.register(payload).subscribe({
			next: () => {
				this.router.navigate(['/auth/login']);
			},
			error: (err) => {
				this.errorMsg = err?.error?.message || 'Error al registrarse';
				this.loading = false;
			},
			complete: () => {
				this.loading = false;
			},
		});
	}

	private passwordMatchValidator(
		control: AbstractControl,
	): ValidationErrors | null {
		const password = control.get('password')?.value;
		const confirm = control.get('confirmPassword')?.value;

		return password === confirm ? null : { passwordMismatch: true };
	}
}
