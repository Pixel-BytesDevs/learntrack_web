import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RecomendacionService } from '../../../../infraestructure/services/modulo-alumno/recomendaciones/recomendacion.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-recomendaciones',
	imports: [RouterOutlet],
	templateUrl: './recomendaciones.component.html',
	styleUrl: './recomendaciones.component.scss',
})
export class RecomendacionesComponent implements OnInit, OnDestroy {
	topicName: string = '';
	description: string = '';
	recommendationText: string = '';
	currentDomain: number = 65; // Este valor puede ser calculado o pasado desde un servicio
	competence: string = 'Ecuaciones Lineales';
	level: string = 'Básico';
	learningObjective: string =
		'Resolver ecuaciones de primer grado con una variable';
	learningStyle: string = 'Optimizado para estilo visual';
	progress: number = 68; // Este valor puede ser calculado o pasado desde un servicio
	prerequisites: string[] = [
		'Propiedades básicas de la igualdad',
		'Operaciones con números enteros',
		'Simplificación de expresiones',
	];

	constructor(private recomendacionService: RecomendacionService) {}

	ngOnInit(): void {
		this.loadRecommendationData();

		// this.recomendacionService
		// 	.pollRecommendation(1, 5000)
		// 	.subscribe((recommendation) => {
		// 		if (recommendation) {
		// 			console.log('Recomendación lista:', recommendation);
		// 			// Aquí puedes actualizar la UI con la recomendación recibida
		// 		} else {
		// 			console.log('Recomendación aún no está lista, esperando...');
		// 		}
		// 	});
	}

	loadRecommendationData(): void {
		this.recomendacionService.getRecommendation(1).subscribe((data) => {
			// this.topicName = data.topicName;
			// this.description = data.description;
			// this.recommendationText = data.recommendationText;
			// this.currentDomain = data.currentDomain;
			// this.competence = data.competence;
			// this.level = data.level;
			// this.learningObjective = data.learningObjective;
			// this.learningStyle = data.learningStyle;
			// this.progress = data.progress;
			// this.prerequisites = data.prerequisites;
		});
	}

  ngOnDestroy(): void {
    this.recomendacionService.stopPolling();
  }
}
