import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';

export const routes: Routes = [
	{
		path: '',component: HomeComponent
	},
	{
		path: 'authorized',component: AuthorizedComponent
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
		loadChildren: () => import('./ui/routes/main.routes').then(
			(r) => r.MAIN_ROUTES
		)
	},
	{
		path: 'auth',
		loadComponent: () => import('./ui/pages/home/home.component').then(
			(c) => c.HomeComponent
		)
	},
    {
        path: '**',
        redirectTo: '',
		pathMatch: 'full'
    }
];
