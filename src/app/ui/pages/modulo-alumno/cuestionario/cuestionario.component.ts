import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { SessionStorage } from '../../../../infraestructure/storages/session/session.storage';
import { KEYS_STORAGE } from '../../../../core/domain/constants/key-local-storage.const';

@Component({
	selector: 'cuestionario',
	imports: [RouterOutlet, NgIf, NgClass],
	templateUrl: './cuestionario.component.html',
	styleUrl: './cuestionario.component.scss',
})
export class CuestionarioComponent implements OnInit {
	isOpen = false; // Estado del dropdown del usuario
	isProgressVisible = true; // Barra de progreso visible
	progress = 0; // Porcentaje de progreso

	constructor(private router: Router, private storageSesion: SessionStorage) {}

	ngOnInit(): void {
		// Ejemplo de lógica para manejar el progreso
    var progressInSession = this.storageSesion.get(KEYS_STORAGE.progresoGeneral);
    if(progressInSession){
      this.progress = progressInSession;
    }

		this.router.events.subscribe((event) => {
			// Lógica para actualizar el progreso según el enrutamiento
			// Este es un ejemplo básico. Puedes ajustarlo según la lógica real.
			if (this.router.url.includes('cuestionario-nivel')) {
				this.updateProgress(50); // Progreso en 50% cuando estamos en el cuestionario de nivel
			} else {
				this.updateProgress(0); // Restablecer progreso cuando estamos en la vista inicial
			}
		});
	}

	// Método para cambiar el progreso
	updateProgress(progress: number): void {
		this.progress = progress;
    this.storageSesion.save(KEYS_STORAGE.progresoGeneral,progress);
	}

	// Método para abrir/cerrar el dropdown del usuario
	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}
}
