import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RecomendacionService } from '../../../../../infraestructure/services/modulo-alumno/recomendaciones/recomendacion.service';
import { TrackuiEtiquetaComponent } from '../../../../shared/trackui/trackui-etiqueta/trackui-etiqueta.component';
import { Router } from '@angular/router';
import { AsyncPipe} from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Recommendation } from '../../../../../core/domain/dto/recommendation/recommendation.dto';
import { OAData } from '../../../../../core/domain/dto/recommendation/oa-data.dto';
import { RecomendationStateService } from '../../../../../infraestructure/services/modulo-alumno/recomendation-state/recomendation-state.service';
@Component({
	selector: 'app-oa-recomendado',
	imports: [],
	templateUrl: './oa-recomendado.component.html',
	styleUrl: './oa-recomendado.component.scss',
})
export class OaRecomendadoComponent implements OnInit, OnDestroy {
	prerequisites: string[] = [
		'Propiedades básicas de la igualdad',
		'Operaciones con números enteros',
		'Simplificación de expresiones',
	];

	recommendation?: Recommendation | null | undefined;
	oaPrincipal?: OAData;

	private stopPolling$ = new Subject<void>();
	private destroy$ = new Subject<void>();
	constructor(
		public recomendacionService: RecomendacionService,
		private readonly router: Router,
		private cdr: ChangeDetectorRef,
		private recommendationStateService: RecomendationStateService,
	) {}

	ngOnInit(): void {
		this.recommendationStateService.recommendation$
			.pipe(takeUntil(this.destroy$))
			.subscribe((recommendation) => {
				this.recommendation = recommendation;
				if (recommendation) {
					this.oaPrincipal = this.getBestOA(recommendation.learningObjects);
					console.log('Recomendación actualizada:', recommendation);
					console.log('Mejor OA (stylePercentage más alto):', this.oaPrincipal);
					this.recommendationStateService.setOaPrincipal(this.oaPrincipal); // Actualizar oaPrincipal en el servicio
					this.cdr.detectChanges();
				}
			});

		// Comienza el polling para obtener la recomendación
		this.recomendacionService
			.pollRecommendation(1, this.stopPolling$, 3000)
			.pipe(takeUntil(this.destroy$))
			.subscribe();
	}

	/**
	 * Obtiene el OA con el stylePercentage más alto
	 */
	getBestOA(learningObjects: OAData[]): OAData | undefined {
		if (!learningObjects || learningObjects.length === 0) {
			return undefined;
		}

		return learningObjects.reduce((best, current) => {
			return current.stylePercentage > best.stylePercentage ? current : best;
		});
	}

	/**
	 * Alternativa: Obtener los N mejores OAs ordenados por stylePercentage
	 */
	getTopOAs(learningObjects: OAData[], topN: number = 3): OAData[] {
		if (!learningObjects || learningObjects.length === 0) {
			return [];
		}

		return [...learningObjects]
			.sort((a, b) => b.stylePercentage - a.stylePercentage)
			.slice(0, topN);
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
