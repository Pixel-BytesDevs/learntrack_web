import { TEST_INITIAL_ROUTES } from './initial-test.routes';
import { PROFESOR_ROUTES } from './profesor.routes';
import { ALUMNO_ROUTES } from './alumno.routes';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { HomeComponent } from '../pages/home/home.component';
import { authGuard } from '../../infraestructure/guards/auth/auth.guard';
import { roleGuard } from '../../infraestructure/guards/auth/role.guard';
import { initialTestGuard } from '../../infraestructure/guards/auth/initial-test.guard';
import { aulaGuard } from '../../infraestructure/guards/auth/aula.guard';

export const MAIN_ROUTES: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'initial-test',
				canActivate: [roleGuard,authGuard,initialTestGuard],
				data: { roles: ['ROLE_USER'] },
				loadChildren: () =>
					import('./initial-test.routes').then((r) => r.TEST_INITIAL_ROUTES),
			},
			{
				path: 'alumno',
				canActivate: [roleGuard,authGuard,aulaGuard],
				data: { roles: ['ROLE_USER'] },
				loadChildren: () =>
					import('./alumno.routes').then((r) => r.ALUMNO_ROUTES),
			},
			{
				path: 'profesor',
				canActivate: [authGuard,roleGuard],
				data: { roles: ['ROLE_PROFESOR'] },
				loadChildren: () =>
					import('./profesor.routes').then((r) => r.PROFESOR_ROUTES),
			},

			{
				path: '**',
				redirectTo: 'home',
			},
		],
	},
];
