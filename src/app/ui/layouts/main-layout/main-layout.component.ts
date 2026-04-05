import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderProfesorComponent } from '../../shared/components/header-profesor/header-profesor.component';
import { SidebarAppComponent } from '../../shared/components/sidebar-app/sidebar-app.component';
import { routeTransitionAnimations } from './main-layout.animation';
import { AppHeaderComponent } from '../../shared/components/header/header.component';

@Component({
	selector: 'app-main-layout',
	imports: [AppHeaderComponent, RouterOutlet, SidebarAppComponent],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss',
	animations: [routeTransitionAnimations],
})
export class MainLayoutComponent {
	isMobile = signal<boolean>(false);
	isOpenMenu = signal<boolean>(false);

	constructor() {
		this.checkScreenSize();
	}

	@HostListener('window:resize')
	onResize() {
		this.checkScreenSize();
	}

	checkScreenSize() {
		const esMobile = window.innerWidth <= 768;
		this.isMobile.set(esMobile);
	}

	abrirMenu() {
		this.isOpenMenu.update((valor) => !valor);
		console.log('Valor de openMenu: ', this.isOpenMenu());
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet?.activatedRouteData?.['animation'];
	}
}
