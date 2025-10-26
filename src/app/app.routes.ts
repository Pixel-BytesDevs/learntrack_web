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
	// {
	// 	path: '',
	// 	loadChildren: () => import('./ui/routes/main.routes').then(
	// 		(r) => r.MAIN_ROUTES
	// 	)
	// },
	{
		path: 'auth',
		loadComponent: () => import('./ui/pages/home/home.component').then(
			(c) => c.HomeComponent
		)
	},
    {
        path: '**',
        redirectTo: 'profesor'
    }
];
