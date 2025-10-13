import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderProfesorComponent } from '../../shared/components/header-profesor/header-profesor.component';
import { SidebarAppComponent } from '../../shared/components/sidebar-app/sidebar-app.component';
import { routeTransitionAnimations } from './main-layout.animation';

@Component({
	selector: 'app-main-layout',
	imports: [
		HeaderProfesorComponent,
		RouterOutlet,
		SidebarAppComponent,
	],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss',
	animations: [routeTransitionAnimations],
})
export class MainLayoutComponent {
	isSidebarOpen = false;
	sidebarItems = [
		{ label: 'Inicio', ruta: '', icon: 'home' },
		{ label: 'Cursos', ruta: '/courses', icon: 'school' },
		{ label: 'Perfil', ruta: '/profile', icon: 'person' },
	];

	toggleSidebar() {
		this.isSidebarOpen = !this.isSidebarOpen;
	}

	closeSidebar() {
		this.isSidebarOpen = false;
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet?.activatedRouteData?.['animation'];
	}
}
