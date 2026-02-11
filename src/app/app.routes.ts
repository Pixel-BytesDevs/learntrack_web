import { AuthLayoutComponent } from './ui/pages/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './ui/pages/auth/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'playground',
		loadComponent: () =>
			import('./ui/pages/extras/playground/playground.component').then(
				(c) => c.PlayGroundPage,
			),
	},
	{
		path: 'profesor',
		loadChildren: () => import('./ui/routes/profesor.routes').then(
			(r) => r.PROFESOR_ROUTES
		)
	},
	{
		path: 'alumno',
		loadChildren: () => import('./ui/routes/alumno.routes').then(
			(r) => r.ALUMNO_ROUTES
		)
	},
	{
		path: 'aula',
		loadChildren: () => import('./ui/routes/alumno-aula.routes').then(
			(r) => r.ALUMNO_AULA_ROUTES
		)
	},
	// {
	// 	path: '',
	// 	loadChildren: () => import('./ui/routes/main.routes').then(
	// 		(r) => r.MAIN_ROUTES
	// 	)
	// },
	{
		path: 'login',
		loadComponent: () => import('./ui/pages/home/home.component').then(
			(c) => c.HomeComponent
		)
	},
	{	path:'auth',
		loadChildren: () => import('./ui/routes/auth.routes').then(
			(r) => r.AUTH_ROUTES
		)
	},
	{	path:'prueba',
		loadComponent: () => import('./ui/pages/modulo-alumno/cuestionario/resultados/resultados.component').then(
			(r) => r.ResultadosComponent
		)
	},
    {
        path: '**',
        redirectTo: 'profesor'
    }
];
