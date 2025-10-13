import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TrackUiIconsDirective } from '../../trackui/trackui-icons/trackui-icons.directive';
import { ItemSidebarAppComponent } from './item-sidebar-app/item-sidebar-app.component';




@Component({
	selector: 'sidebar-app',
	imports: [ TrackUiIconsDirective, ItemSidebarAppComponent],
	templateUrl: './sidebar-app.component.html',
	styleUrl: './sidebar-app.component.scss',
})
export class SidebarAppComponent {

	isExpanded = signal<boolean>(true);

  controlOpcionSeleccionada = signal<string>('Dashboard')

	colapsar() {
		this.isExpanded.update((valor) => !valor);
	}

}
