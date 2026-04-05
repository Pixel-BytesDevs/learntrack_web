import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { authGuard } from './infraestructure/guards/auth/auth.guard';
import { roleGuard } from './infraestructure/guards/auth/role.guard';
import { firstLoginGuard } from './infraestructure/guards/auth/first-login.guard';
import { aulaGuard } from './infraestructure/guards/auth/aula.guard';

export const routes: Routes = [

  // ── Públicas ──────────────────────────────────────────────────
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'authorized',
    component: AuthorizedComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./ui/routes/auth.routes').then(r => r.AUTH_ROUTES),
  },

  // ── VARK — primer login alumno ────────────────────────────────
  {
    path: 'alumno',
    canActivate: [authGuard, roleGuard,firstLoginGuard],
    data: { roles: ['ROLE_USER'] },
    loadChildren: () =>
      import('./ui/routes/alumno.routes').then(r => r.ALUMNO_ROUTES),
  },

  // ── Área alumno (con sidebar) ─────────────────────────────────
  {
    path: 'aula',
    canActivate: [authGuard, roleGuard,aulaGuard],
    data: { roles: ['ROLE_USER'] },
    loadChildren: () =>
      import('./ui/routes/alumno-aula.routes').then(r => r.ALUMNO_AULA_ROUTES),
  },

  // ── Área profesor (con sidebar) ───────────────────────────────
  {
    path: 'profesor',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_PROFESOR'] },
    loadChildren: () =>
      import('./ui/routes/profesor.routes').then(r => r.PROFESOR_ROUTES),
  },

  // ── Área admin (con sidebar) ──────────────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_ADMIN'] },
    loadChildren: () =>
      import('./ui/routes/admin.routes').then(r => r.ADMIN_ROUTES),
  },

  { path: '**', redirectTo: '' },
];