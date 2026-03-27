import { Component, computed, inject, input, OnInit } from '@angular/core';
import { TiposMessage } from '../../../../core/domain/types/tipos-message.type';
import { TrackuiIcons } from '../../../../core/domain/types/tipos-icons.type';
import {
	AppError,
	ErrorApiService,
} from '../../../../infraestructure/bebux/error-api.service';
import { NgClass } from '@angular/common';
import { TrackUiIconsDirective } from '../trackui-icons/trackui-icons.directive';
import { filter } from 'rxjs';

// index.html ->
@Component({
	selector: 'app-trackui-message',
	imports: [NgClass, TrackUiIconsDirective],
	templateUrl: './trackui-message.component.html',
	styleUrl: './trackui-message.component.scss',
})
export class TrackuiMessageComponent implements OnInit {
	tipo = input.required<TiposMessage>();
	visible = false;
	private timeout?: number;

	error?: AppError;

	errorApiService = inject(ErrorApiService);

	constructor() {}

	ngOnInit() {
		this.errorApiService.error$
			.pipe(filter((e): e is AppError => e !== null))
			.subscribe((error) => {
				this.error = error;
				console.log('Error recibido en el componente:', error);
				this.mostrar();
			});
	}

	mostrar() {
		clearTimeout(this.timeout);
		this.visible = true;

		this.timeout = window.setTimeout(() => {
			this.visible = false;
		}, 5000);
	}

	public iconPorTipo(tipo: TiposMessage): TrackuiIcons {
		switch (tipo) {
			case 'success':
				return 'check';
			case 'danger':
				return 'equis';
			default:
				return 'alerta';
		}
	}
}
