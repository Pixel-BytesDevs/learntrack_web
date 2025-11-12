import { NgClass } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { TrackUiIconsDirective } from '../../trackui/trackui-icons/trackui-icons.directive';
import { ItemSidebarAppComponent } from './item-sidebar-app/item-sidebar-app.component';
import { NgFor } from '@angular/common';
import { TrackuiIcons } from '../../../../core/domain/types/tipos-icons.type';

interface SidebarItem {
  label: string;
  icon: TrackuiIcons;
  route: string;
}

@Component({
	selector: 'sidebar-app',
	imports: [TrackUiIconsDirective,NgFor, NgClass, ItemSidebarAppComponent],
	templateUrl: './sidebar-app.component.html',
	styleUrl: './sidebar-app.component.scss',
})
export class SidebarAppComponent {
	mockUser = {
		name: 'Juan Pérez',
		role: 'alumno',
	};

	sidebarItems: SidebarItem[] = [];
	isExpanded = signal<boolean>(true);
	isMobile = input.required<boolean>();
	isOpenMenu = input.required<boolean>();

	controlOpcionSeleccionada = signal<string>('Dashboard');

	constructor() {
		this.loadSidebarItems();
		const guardado = localStorage.getItem('opcionSeleccionada');
		if (guardado) {
			this.controlOpcionSeleccionada.set(guardado);
		}

		effect(() => {
			const opcionActual = this.controlOpcionSeleccionada();
			localStorage.setItem('opcionSeleccionada', opcionActual);
		});
	}

	colapsar() {
		this.isExpanded.update((valor) => !valor);
	}

	loadSidebarItems() {
    const role = this.mockUser.role;

    switch (role) {
      case 'profesor':
        this.sidebarItems = [
          { label: 'Dashboard', icon: 'home', route: '' },
          { label: 'Grafo', icon: 'grafo', route: 'grafo' },
		  { label: 'Cursos', icon: 'grafo', route: 'grafo' },
          { label: 'Gestión de contenidos', icon: 'grafo', route: 'grafo' },
        ];
        break;

      case 'alumno':
        this.sidebarItems = [
          { label: 'Dashboard', icon: 'home', route: '/aula/dashboard' },
          { label: 'Mi progreso', icon: 'home', route: '/aula/my-progress' },
          { label: 'Mis recomendaciones', icon: 'home', route: '/aula/recomendaciones' },
          { label: 'Perfil', icon: 'home', route: 'profile' },
        ];
        break;

      case 'admin':
        this.sidebarItems = [
          { label: 'Panel', icon: 'home', route: 'admin-dashboard' },
          { label: 'Usuarios', icon: 'home', route: 'users' },
          { label: 'Reportes', icon: 'home', route: 'reports' },
        ];
        break;

      default:
        this.sidebarItems = [{ label: 'Inicio', icon: 'home', route: '' }];
    }
  }
}
