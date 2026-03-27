import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouteProgressComponent } from './components/route-progress/route-progress.component';
import { RouterOutlet } from "../../../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
	selector: 'my-progress',
	imports: [NgClass, RouteProgressComponent],
	templateUrl: './my-progress.component.html',
	styleUrl: './my-progress.component.scss',
})
export class MyProgressComponent {
  selectedTab: 'general' | 'ruta' = 'general';

  selectTab(tab: 'general' | 'ruta') {
    this.selectedTab = tab;
  }
}
