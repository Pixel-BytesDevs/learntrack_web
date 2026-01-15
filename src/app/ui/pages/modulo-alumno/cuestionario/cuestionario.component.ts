import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { SessionStorage } from '../../../../infraestructure/storages/session/session.storage';
import { KEYS_STORAGE } from '../../../../core/domain/constants/key-local-storage.const';

@Component({
	selector: 'cuestionario',
	imports: [RouterOutlet, NgClass],
	templateUrl: './cuestionario.component.html',
	styleUrl: './cuestionario.component.scss',
})
export class CuestionarioComponent implements OnInit {
	isOpen = false; // Estado del dropdown del usuario
	isProgressVisible = true; // Barra de progreso visible
	progress = 0;

	constructor(
		private router: Router,
		private storageSesion: SessionStorage,
	) {}

	ngOnInit(): void {
		var progressInSession = this.storageSesion.get(
			KEYS_STORAGE.progresoGeneral,
		);
		if (progressInSession) {
			//this.progress = progressInSession;
		}

		this.router.events.subscribe((event) => {
			if (this.router.url.includes('cuestionario-nivel')) {
				this.updateProgress(50);
			} else {
				this.updateProgress(0);
			}
		});
	}

	updateProgress(progress: number): void {
		this.progress = progress;
		this.storageSesion.save(KEYS_STORAGE.progresoGeneral, progress);
	}

	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}
}
