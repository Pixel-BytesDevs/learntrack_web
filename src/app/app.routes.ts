import { MAIN_ROUTES } from './ui/routes/main.routes';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { authGuard } from './infraestructure/guards/auth/auth.guard';
import { roleGuard } from './infraestructure/guards/auth/role.guard';
import { aulaGuard } from './infraestructure/guards/auth/aula.guard';

export const routes: Routes = [
	{
		path: 'authorized',
		component: AuthorizedComponent,
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./ui/routes/auth.routes').then((r) => r.AUTH_ROUTES),
	},
	{
		path: '',
		loadChildren: () =>
			import('./ui/routes/main.routes').then((r) => r.MAIN_ROUTES),
	},
	{ path: '**', redirectTo: '' },

];
