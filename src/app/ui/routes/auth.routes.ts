import { RegisterComponent } from './../pages/auth/register/register.component';
import { LoginComponent } from './../pages/auth/login/login.component';
import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "../pages/auth/auth-layout/auth-layout.component";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
				path: 'login',
				loadComponent: () =>
					import('../pages/auth/login/login.component').then(
						(c) => c.LoginComponent,
					),
			},{
				path: 'register',
				loadComponent: () =>
					import('../pages/auth/register/register.component').then(
						(c) => c.RegisterComponent,
					),
			},
        ]
    }
]