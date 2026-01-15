import { Component, computed, input, model } from '@angular/core';
import { TrackuiIcons } from '../../../../../core/domain/types/tipos-icons.type';
import { TrackUiIconsDirective } from '../../../../shared/trackui/trackui-icons/trackui-icons.directive';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'item-sidebar-app',
	imports: [TrackUiIconsDirective, NgClass, RouterLink],
	templateUrl: './item-sidebar-app.component.html',
	styleUrl: './item-sidebar-app.component.scss',
	 animations: [
    trigger('fadeLabel', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-6px)' }),
        animate(
          '200ms 120ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 0, transform: 'translateX(-6px)' })
        ),
      ]),
    ]),
  ],
})
export class ItemSidebarAppComponent {
	isExpanded = input.required<boolean>();
	nombreIcon = input.required<TrackuiIcons>();
	label = input.required<string>();
  ruta = input.required<string>();

  controlItem = model.required<string>();

  estaSeleccionado = computed<boolean>(() => {
    return this.controlItem() === this.label()
  });

  seleccionar(){
    this.controlItem.set(this.label());
  }
}
