import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderProfesorComponent } from '../../shared/components/header-profesor/header-profesor.component';
import { SidebarAppComponent } from '../../shared/components/sidebar-app/sidebar-app.component';
import { routeTransitionAnimations } from './main-layout.animation';
import { AppHeaderComponent } from '../../shared/components/header/header.component';

@Component({
	selector: 'app-main-layout',
	imports: [AppHeaderComponent,RouterOutlet],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss',
	animations: [routeTransitionAnimations],
})
export class MainLayoutComponent {

}
