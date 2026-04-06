import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarAppComponent } from '../../../shared/components/sidebar-app/sidebar-app.component';

@Component({
	selector: 'app-sidebar-layout',
	imports: [RouterOutlet, SidebarAppComponent],
	templateUrl: './sidebar-layout.component.html',
	styleUrl: './sidebar-layout.component.scss',
})
export class SidebarLayoutComponent {
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
