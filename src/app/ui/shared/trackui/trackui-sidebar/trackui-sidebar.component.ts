import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { SidebarItemsComponent } from '../../components/sidebar-item/sidebar-items.component';

@Component({
	selector: 'trackui-sidebar',
	imports: [SidebarItemsComponent],
	templateUrl: './trackui-sidebar.component.html',
	styleUrl: './trackui-sidebar.component.scss',
})

export class TrackuiSidebarComponent {
	@Input() titulo: string = ''; 
  	@Input() isOpen = false; 
  	@Input() items: Array<{ label: string, ruta: string, icon: string }> = []; 
  	@Output() cerrar = new EventEmitter<void>(); 
  	closeSidebar() {
    	this.cerrar.emit(); 
  	}
}
