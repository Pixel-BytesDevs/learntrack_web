import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TrackUiIconsDirective } from '../../trackui/trackui-icons/trackui-icons.directive';

@Component({
	selector: 'header-profesor',
	imports: [NgClass, TrackUiIconsDirective],
	templateUrl: './header-profesor.component.html',
	styleUrl: './header-profesor.component.scss',
	animations: [
		trigger('fadeInScale', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-5px) scale(0.98)' }),
				animate(
					'150ms ease-out',
					style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
				),
			]),
			transition(':leave', [
				animate(
					'120ms ease-in',
					style({ opacity: 0, transform: 'translateY(-5px) scale(0.98)' }),
				),
			]),
		]),
	],
})
export class HeaderProfesorComponent {
	isOpen = false;

	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}
}
