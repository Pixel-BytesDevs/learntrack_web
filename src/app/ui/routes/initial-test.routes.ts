import { Routes } from '@angular/router';
import { TestLayoutComponent } from '../layouts/test-layout/test-layout.component';

export const TEST_INITIAL_ROUTES: Routes = [
  {
    path: '',
    component: TestLayoutComponent, 
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../pages/modulo-alumno/cuestionario/vista-inicial/vista-inicial.component')
            .then(c => c.VistaInicialComponent),
      },
      {
        path: 'test-vark',
        loadComponent: () =>
          import('../pages/modulo-alumno/cuestionario/cuestionario-vark/cuestionario-vark.component')
            .then(c => c.CuestionarioVarkComponent),
      },
      {
        path: 'test-nivel',
        loadComponent: () =>
          import('../pages/modulo-alumno/cuestionario/cuestionario-nivel/cuestionario-nivel.component')
            .then(c => c.CuestionarioNivelComponent),
      },
      {
        path: 'results',
        loadComponent: () =>
          import('../pages/modulo-alumno/cuestionario/resultados/resultados.component')
            .then(c => c.ResultadosComponent),
      },
    ],
  },
];