import { Component, input, Input } from '@angular/core';
import { SidebarItem } from '../../../../core/domain/interfaces/sidebar-item.interface';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'sidebar-items',
	imports: [RouterLink],
	templateUrl: './sidebar-items.component.html',
	styleUrl: './sidebar-items.component.scss',
})
export class SidebarItemsComponent {
	 @Input() items: Array<{ label: string, ruta: string, icon: string }> = [];
  	constructor() {}
}
