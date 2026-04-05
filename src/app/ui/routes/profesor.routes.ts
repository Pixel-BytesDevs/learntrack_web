import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

export const PROFESOR_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,     // mismo layout, sidebar cambia por rol
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../pages/modulo-profesor/dashboard/dashboard.component')
            .then(c => c.DashboardComponent),
        data: { animation: 'DashboardPage' },
      },
      {
        path: 'grafo',
        loadComponent: () =>
          import('../pages/modulo-profesor/grafo-competencias/grafo-competencias.component')
            .then(c => c.GrafoCompetenciasComponent),
        data: { animation: 'GrafoPage' },
      },
      {
        path: 'gestion-contenidos',
        loadChildren: () =>
          import('./gestion-contenidos.routes').then(r => r.GESTION_CONTENIDOS_ROUTES),
      },
    ],
  },
];
