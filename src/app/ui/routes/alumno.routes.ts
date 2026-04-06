import { RecomendacionesComponent } from './../pages/modulo-alumno/recomendaciones/recomendaciones.component';
import { MyProgressComponent } from './../pages/modulo-alumno/my-progress/my-progress.component';
import { DashboardComponent } from './../pages/modulo-alumno/dashboard/dashboard.component';
import { CuestionarioNivelComponent } from './../pages/modulo-alumno/cuestionario/cuestionario-nivel/cuestionario-nivel.component';
import { Routes } from '@angular/router';
import { CuestionarioComponent } from '../pages/modulo-alumno/cuestionario/cuestionario.component';
import { SidebarLayoutComponent } from '../layouts/sidebar-layout/sidebar-layout/sidebar-layout.component';

export const ALUMNO_ROUTES: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../pages/modulo-alumno/dashboard/dashboard.component')
            .then(c => c.DashboardComponent),
      },{
        path: 'progress',
        loadComponent: () =>
          import('../pages/modulo-alumno/my-progress/my-progress.component')
            .then(c => c.MyProgressComponent),
      },{
        path: 'recomendations',
        loadComponent: () =>
          import('../pages/modulo-alumno/recomendaciones/recomendaciones.component')
            .then(c => c.RecomendacionesComponent),
      }
    ],
  },
];