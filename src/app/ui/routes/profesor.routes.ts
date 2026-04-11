import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from '../layouts/sidebar-layout/sidebar-layout/sidebar-layout.component';

export const PROFESOR_ROUTES: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
  
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
            .then((c) => c.GrafoCompetenciasComponent,),
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
