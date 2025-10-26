import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf,NgClass } from '@angular/common';
import { TrackUiIconsDirective } from '../../../../shared/trackui/trackui-icons/trackui-icons.directive';
import { TrackuiButtonDirective } from '../../../../shared/trackui/trackui-button/trackui-button.directive';

@Component({
	selector: 'vista-inicial',
	imports: [TrackUiIconsDirective,TrackuiButtonDirective],
	templateUrl: './vista-inicial.component.html',
	styleUrl: './vista-inicial.component.scss',
})
export class VistaInicialComponent {
	isOpen = false; // Estado del dropdown del usuario
	isProgressVisible = true; // Barra de progreso visible
	progress = 0; // Progreso inicial (0%)

	constructor(private router: Router) {}

	// Lógica para mostrar el progreso
	ngOnInit(): void {
		// Aquí puedes simular el avance en la barra de progreso. En este ejemplo es solo 0.
		// Conforme el usuario avanza, puedes actualizar este valor.
		this.updateProgress(0);
	}

	// Actualiza la barra de progreso
	updateProgress(progress: number): void {
		this.progress = progress;
	}

	// Función para iniciar la evaluación del nivel actual
	startEvaluacionNivel(): void {
		this.router.navigate(['alumno/cuestionario-nivel']);
	}

	// Función para iniciar el cuestionario VARK
	startCuestionarioVark(): void {
		this.router.navigate(['alumno/cuestionario-vark']);
	}

	// Función para iniciar todo el diagnóstico
	startDiagnostico(): void {
		this.router.navigate(['alumno/cuestionario-vark']);
		this.updateProgress(25); // Cambiar el progreso al 25% (Ejemplo de avance)
	}

	// Método para abrir/cerrar el dropdown del usuario
	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}
}
