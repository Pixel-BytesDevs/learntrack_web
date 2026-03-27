import { Routes } from '@angular/router';

export const GESTION_CONTENIDOS_ROUTES: Routes = [
	{
		path: '',
		children: [
			{
				path: 'listado',
				loadChildren: () =>
					import('../pages/modulo-profesor/gestion-contenidos/listado-oas/listado-oas.component').then(
						(c) => c.ListadoOAsComponent,
					),
			}
		],
	},
];
