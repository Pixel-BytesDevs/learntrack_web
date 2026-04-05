import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

export const ALUMNO_AULA_ROUTES: Routes = [
{
    path: '',
    component: MainLayoutComponent,     // layout con sidebar alumno
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../pages/modulo-alumno/dashboard/dashboard.component')
            .then(c => c.DashboardComponent),
      },
      {
        path: 'my-progress',
        loadComponent: () =>
          import('../pages/modulo-alumno/my-progress/my-progress.component')
            .then(c => c.MyProgressComponent),
      },
      {
        path: 'recomendaciones',
        loadChildren: () =>
          import('./recomendaciones.routes').then(r => r.RECOMENDACIONES_ROUTES),
      },
    ],
  },
];
