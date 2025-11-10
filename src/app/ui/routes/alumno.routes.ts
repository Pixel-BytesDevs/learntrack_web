import { CuestionarioNivelComponent } from './../pages/modulo-alumno/cuestionario/cuestionario-nivel/cuestionario-nivel.component';
import { Routes } from '@angular/router';
import { CuestionarioComponent } from '../pages/modulo-alumno/cuestionario/cuestionario.component';

export const ALUMNO_ROUTES: Routes = [
	{
		path: '',
        component: CuestionarioComponent,
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../pages/modulo-alumno/cuestionario/vista-inicial/vista-inicial.component').then(
						(c) => c.VistaInicialComponent,
					),
			},
            {
				path: 'cuestionario-vark',
				loadComponent: () =>
					import('../pages/modulo-alumno/cuestionario/cuestionario-vark/cuestionario-vark.component').then(
						(c) => c.CuestionarioVarkComponent,
					),
			},
            {
				path: 'cuestionario-nivel',
				loadComponent: () =>
					import('../pages/modulo-alumno/cuestionario/cuestionario-nivel/cuestionario-nivel.component').then(
						(c) => c.CuestionarioNivelComponent,
					),
			},
			{
				path: 'resultados',
				loadComponent: () =>
					import('../pages/modulo-alumno/cuestionario/resultados/resultados.component').then(
						(c) => c.ResultadosComponent,
					),
			},
			{
				path: 'dashboard',
				loadComponent: () =>
					import('../pages/modulo-alumno/dashboard/dashboard.component').then(
						(c) => c.DashboardComponent,
					),
			}
		],
	},
];
