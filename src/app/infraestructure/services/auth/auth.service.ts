import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Services } from '../../../../environments/services/services.dev';
import { LoginPayload } from '../../../core/domain/interfaces/auth/login-payload.interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../core/domain/interfaces/auth/login-response.interface';
import { RegisterPayload } from '../../../core/domain/interfaces/auth/register-payload.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private http = inject(HttpClient);
	private api = Services.auth.login;
	constructor() {}

	login(data: LoginPayload): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${this.api}/login`, data);
	}

	register(data: RegisterPayload): Observable<void> {
		return this.http.post<void>(`${this.api}/register`, data);
	}
}
