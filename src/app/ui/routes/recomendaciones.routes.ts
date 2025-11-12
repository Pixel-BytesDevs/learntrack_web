import { Routes } from '@angular/router';
import { RecomendacionesComponent } from '../pages/modulo-alumno/recomendaciones/recomendaciones.component';

export const RECOMENDACIONES_ROUTES: Routes = [
	{
		path: '',
		component: RecomendacionesComponent,
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../pages/modulo-alumno/recomendaciones/oa-recomendado/oa-recomendado.component').then(
						(c) => c.OaRecomendadoComponent,
					),
			},
			{
				path: 'visor-oa',
				loadComponent: () =>
					import(
						'../pages/modulo-alumno/recomendaciones/visor-oa/visor-oa.component'
					).then((c) => c.VisorOaComponent),
			}
		],
	},
];
