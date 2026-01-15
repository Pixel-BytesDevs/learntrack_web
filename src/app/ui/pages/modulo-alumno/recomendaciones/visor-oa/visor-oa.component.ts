import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import {
	OAResource,
	OAViewerData,
} from '../../../../../core/domain/interfaces/gestor-oa/oa-resource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OaViewerService } from '../../../../../infraestructure/services/modulo-alumno/oa-viewer/oa-viewer.service';
import { CommonModule } from '@angular/common';
import { RecomendationStateService } from '../../../../../infraestructure/services/modulo-alumno/recomendation-state/recomendation-state.service';
import { Recommendation } from '../../../../../core/domain/dto/recommendation/recommendation.dto';
import { OAData } from '../../../../../core/domain/dto/recommendation/oa-data.dto';
import { EvaluacionComponent } from '../evaluacion/evaluacion.component';

@Component({
	selector: 'app-visor-oa',
	imports: [CommonModule],
	templateUrl: './visor-oa.component.html',
	styleUrl: './visor-oa.component.scss',
})
export class VisorOaComponent implements OnInit, OnDestroy {
	@ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
	@ViewChild('pdfViewer') pdfViewer!: ElementRef<HTMLEmbedElement>;

	showEvaluation = false;
	evaluationResult: any = null;
	recommendation?: Recommendation | null | undefined;
	oaPrincipal?: OAData;
	complementaryResources?: OAData[];
	mockObjectives?: String[] = ['Objetivo 1', 'Objetivo 2', 'Objetivo 3'];

	loading = true;
	error: string | null = null;
	currentResourceUrl: string | null = null;
	activeTab: 'main' | 'complementary' = 'main';
	selectedResource: OAData | null = null;
	videoProgress = 0;
	videoDuration = 0;
	isPlaying = false;
	currentTime = 0;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private recommendationStateService: RecomendationStateService,
	) {}

	ngOnInit(): void {
		this.loadData();
		this.loading = false;
	}

	loadData() {
		this.recommendationStateService.recommendation$.subscribe(
			(recommendation) => {
				this.recommendation = recommendation;
				console.log(
					'Recomendación actualizada en VisorOaComponent:',
					recommendation,
				);

				// Se obtiene el OA principal con el mayor porcentaje de estilo
				this.recommendationStateService.oaPrincipal$.subscribe(
					(oaPrincipal) => {
						this.oaPrincipal = oaPrincipal;
						console.log('OA Principal en VisorOaComponent:', this.oaPrincipal);
					},
				);

				// Obtener los recursos complementarios
				if (recommendation) {
					this.complementaryResources = this.getTopOAs(
						recommendation.learningObjects,
					);
				}
			},
		);
	}

	ngOnDestroy(): void {}

	getTopOAs(learningObjects: OAData[], topN: number = 3): OAData[] {
		if (!learningObjects || learningObjects.length === 0) {
			return [];
		}

		// Excluir el OA principal de los complementarios
		const filteredOAs = learningObjects.filter((oa) => oa !== this.oaPrincipal);

		return filteredOAs
			.sort((a, b) => b.stylePercentage - a.stylePercentage)
			.slice(0, topN); // Limitar a los N mejores
	}

	selectResource(resource: OAData): void {
		this.selectedResource = resource;
	}

	getResourceTypeIcon(type: string): string {
		const icons: { [key: string]: string } = {
			video: '🎬',
			pdf: '📄',
			image: '🖼️',
			exercise: '💪',
			link: '🔗',
			reading: '📖',
			summary: '📋',
		};
		return icons[type] || '📚';
	}

	getResourceTypeColor(type: string): string {
		const colors: { [key: string]: string } = {
			video: 'tw-bg-purple-100 tw-text-purple-800',
			pdf: 'tw-bg-red-100 tw-text-red-800',
			image: 'tw-bg-green-100 tw-text-green-800',
			exercise: 'tw-bg-orange-100 tw-text-orange-800',
			link: 'tw-bg-blue-100 tw-text-blue-800',
			reading: 'tw-bg-indigo-100 tw-text-indigo-800',
			summary: 'tw-bg-teal-100 tw-text-teal-800',
		};
		return colors[type] || 'tw-bg-gray-100 tw-text-gray-800';
	}

	// Métodos para control de video
	togglePlay(): void {
		if (this.videoPlayer) {
			if (this.isPlaying) {
				this.videoPlayer.nativeElement.pause();
			} else {
				this.videoPlayer.nativeElement.play();
			}
			this.isPlaying = !this.isPlaying;
		}
	}

	onTimeUpdate(): void {
		if (this.videoPlayer && this.selectedResource?.typeName === 'video') {
			this.currentTime = this.videoPlayer.nativeElement.currentTime;
			this.videoDuration = this.videoPlayer.nativeElement.duration;
			this.videoProgress = (this.currentTime / this.videoDuration) * 100;
		}
	}

	seekTo(percentage: number): void {
		if (
			this.videoPlayer &&
			this.videoDuration &&
			this.selectedResource?.typeName === 'video'
		) {
			this.videoPlayer.nativeElement.currentTime =
				(percentage / 100) * this.videoDuration;
		}
	}

	formatTime(seconds: number): string {
		if (isNaN(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	initEvaluation(): void {
		if (!this.recommendation) return;

		// Redirigir a la ruta de evaluación con los parámetros necesarios
		this.router.navigate(['aula/recomendaciones/evaluacion'], {
			queryParams: {
				userId: 1, // Aquí deberías usar el ID del usuario actual
				topicId: this.recommendation.topicId,
			},
		});
	}

	// Agrega métodos para manejar los eventos de evaluación
	onEvaluationCompleted(result: any): void {
		this.evaluationResult = result;
		this.showEvaluation = false;
		// Aquí puedes manejar el resultado de la evaluación
		console.log('Evaluación completada:', result);
	}

	onEvaluationCancelled(): void {
		this.showEvaluation = false;
	}

	goBack(): void {
		this.router.navigate(['/aula/recomendaciones']);
	}
}
