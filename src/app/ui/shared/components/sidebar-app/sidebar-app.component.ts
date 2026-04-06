import { NgClass } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { TrackUiIconsDirective } from '../../trackui/trackui-icons/trackui-icons.directive';
import { ItemSidebarAppComponent } from './item-sidebar-app/item-sidebar-app.component';
import { TrackuiIcons } from '../../../../core/domain/types/tipos-icons.type';
import { TokenService } from '../../../../infraestructure/services/token/token.service';

interface SidebarItem {
  label: string;
  icon: TrackuiIcons;
  route: string;
}

@Component({
	selector: 'sidebar-app',
	imports: [TrackUiIconsDirective, NgClass, ItemSidebarAppComponent],
	templateUrl: './sidebar-app.component.html',
	styleUrl: './sidebar-app.component.scss',
})
export class SidebarAppComponent {
  
 private tokenService = inject(TokenService);
 
  sidebarItems: SidebarItem[] = [];
  isExpanded = signal<boolean>(true);
  isMobile = input.required<boolean>();
  isOpenMenu = input.required<boolean>();
 
  controlOpcionSeleccionada = signal<string>('Dashboard');
 
  constructor() {
    this.loadSidebarItems();
 
    const guardado = localStorage.getItem('opcionSeleccionada');
    if (guardado) this.controlOpcionSeleccionada.set(guardado);
 
    effect(() => {
      localStorage.setItem('opcionSeleccionada', this.controlOpcionSeleccionada());
    });
  }
 
  colapsar() {
    this.isExpanded.update(v => !v);
  }
 
  loadSidebarItems() {
    const roles = this.tokenService.getRoles();
 
    if (roles.includes('ROLE_ADMIN')) {
      this.sidebarItems = [
        { label: 'Panel',    icon: 'home', route: '/admin/dashboard' },
        { label: 'Usuarios', icon: 'home', route: '/admin/users' },
        { label: 'Reportes', icon: 'home', route: '/admin/reports' },
      ];
 
    } else if (roles.includes('ROLE_PROFESOR')) {
      this.sidebarItems = [
        { label: 'Dashboard',             icon: 'home',  route: '/profesor/dashboard' },
        { label: 'Grafo',                 icon: 'grafo', route: '/profesor/grafo' },
        { label: 'Cursos',                icon: 'grafo', route: '/profesor/cursos' },
        { label: 'Gestión de contenidos', icon: 'grafo', route: '/profesor/gestion-contenidos' },
      ];
 
    } else if (roles.includes('ROLE_USER')) {
      this.sidebarItems = [
        { label: 'Dashboard',          icon: 'home', route: '/alumno/dashboard' },
        { label: 'Mi progreso',        icon: 'home', route: '/alumno/progress' },
        { label: 'Mis recomendaciones', icon: 'home', route: '/alumno/recomendations' },
        { label: 'Perfil',             icon: 'home', route: '/alumno/dashboard' },
      ];
 
    } else {
      this.sidebarItems = [{ label: 'Inicio', icon: 'home', route: '' }];
    }
  }
}
