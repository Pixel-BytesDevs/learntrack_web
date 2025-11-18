import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RecomendacionService } from '../../../../../infraestructure/services/modulo-alumno/recomendaciones/recomendacion.service';
import { TrackuiEtiquetaComponent } from '../../../../shared/trackui/trackui-etiqueta/trackui-etiqueta.component';
import { Router } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Recommendation } from '../../../../../core/domain/dto/recommendation/recommendation.dto';
@Component({
	selector: 'app-oa-recomendado',
	imports: [NgFor, AsyncPipe, NgIf],
	templateUrl: './oa-recomendado.component.html',
	styleUrl: './oa-recomendado.component.scss',
})
export class OaRecomendadoComponent implements OnInit, OnDestroy {
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

	recommendation?: Recommendation;
	private stopPolling$ = new Subject<void>();
	private destroy$ = new Subject<void>();
	constructor(
		public recomendacionService: RecomendacionService,
		private readonly router: Router,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.recomendacionService
			.pollRecommendation(1, this.stopPolling$, 3000)
			.pipe(takeUntil(this.destroy$))
			.subscribe((res) => {
				console.log("Respuesta del polling: ", res);
				if (res) {
					this.recommendation = res;
					console.log('Recomendación lista:', res);
					this.cdr.detectChanges();
				}
			});
	}

	loadRecommendationData(): void {
		this.recomendacionService.getRecommendation(1).subscribe((data) => {});
	}

	beginLearning() {
		this.router.navigate(['aula/recomendaciones/visor-oa']);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.recomendacionService.stopPolling(); // asegurar limpieza
	}
}
