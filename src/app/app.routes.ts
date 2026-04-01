import { AuthLayoutComponent } from './ui/pages/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './ui/pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'authorized',
		component: AuthorizedComponent,
	},
	{
		path: 'user',
		component: UserComponent,
	},
	{
		path: 'admin',
		component: AdminComponent,
	},

	{
		path: 'playground',
		loadComponent: () =>
			import('./ui/pages/extras/playground/playground.component').then(
				(c) => c.PlayGroundPage,
			),
	},
	{
		// cuando inician sesión
		//path: '',
		path: 'main',
		loadChildren: () =>
			import('./ui/routes/main.routes').then((r) => r.MAIN_ROUTES),
	},
	{
		path: 'alumno',
		loadChildren: () =>
			import('./ui/routes/alumno.routes').then((r) => r.ALUMNO_ROUTES),
	},
	{
		path: 'aula',
		loadChildren: () =>
			import('./ui/routes/alumno-aula.routes').then(
				(r) => r.ALUMNO_AULA_ROUTES,
			),
	},
	// {
	// 	path: '',
	// 	loadChildren: () => import('./ui/routes/main.routes').then(
	// 		(r) => r.MAIN_ROUTES
	// 	)
	// },
	{
		path: 'login',
		loadComponent: () =>
			import('./ui/pages/home/home.component').then((c) => c.HomeComponent),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./ui/routes/auth.routes').then((r) => r.AUTH_ROUTES),
	},
	{
		path: 'prueba',
		loadComponent: () =>
			import(
				'./ui/pages/modulo-alumno/cuestionario/resultados/resultados.component'
			).then((r) => r.ResultadosComponent),
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	},
];
