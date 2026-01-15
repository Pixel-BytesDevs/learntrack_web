import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { AlternativePlacement } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/alternative-placement.dto';
import { EvaluationResponse } from '../../../../../core/domain/dto/modulo-alumno/evaluacion/evaluation.dto';
import { QuestionPlacement } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/question.dto';
import { EvaluacionService } from '../../../../../infraestructure/services/modulo-alumno/evaluacion/evaluacion.service';
import { KatexDirective } from '../../../../shared/directiva/katex.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
	selector: 'app-evaluacion',
	imports: [KatexDirective, DecimalPipe],
	templateUrl: './evaluacion.component.html',
	styleUrl: './evaluacion.component.scss',
})
export class EvaluacionComponent implements OnInit, OnDestroy {
	placementTest?: EvaluationResponse;
	currentQuestionIndex = 0;
	currentQuestion?: QuestionPlacement;
	level?: string;
	timeRemaining = 0;
	timer: any;
	loading = false;
	error: string | null = null;

	// Estado para el modal de resultados
	showResultModal = false;
	domainLevelResult: number | null | undefined;
	submittingResults = false;

	userId!: number;
	topicId!: string;

	constructor(
		private evaluationService: EvaluacionService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit(): void {
		// Obtener parámetros de la ruta
		this.route.queryParams.subscribe((params) => {
			this.userId = +params['userId'];
			this.topicId = params['topicId'];

			if (this.userId && this.topicId) {
				this.startEvaluation();
			} else {
				this.error = 'Parámetros de evaluación inválidos';
			}
		});
	}

	// Método para obtener la letra de la alternativa (A, B, C, D, etc.)
	getAlternativeLetter(index: number): string {
		return String.fromCharCode(65 + index); // 65 = 'A' en ASCII
	}

	startEvaluation(): void {
		this.loading = true;
		this.error = null;

		const request = {
			userId: this.userId,
			topicId: this.topicId,
		};

		this.evaluationService.evaluateRecommendation(request).subscribe({
			next: (response) => {
				this.placementTest = response;
				this.timeRemaining = response.duration * 60; // convertir a segundos
				this.loadCurrentQuestion();
				this.startTimer();
				this.loading = false;
			},
			error: (error) => {
				this.error = 'Error al iniciar la evaluación';
				this.loading = false;
				console.error('Error:', error);
			},
		});
	}

	loadCurrentQuestion(): void {
		if (
			this.placementTest &&
			this.placementTest.questionTestResponses.length > 0
		) {
			this.currentQuestion =
				this.placementTest.questionTestResponses[this.currentQuestionIndex];
		}
	}

	startTimer(): void {
		this.timer = setInterval(() => {
			if (this.timeRemaining > 0) {
				this.timeRemaining--;
			} else {
				this.finishEvaluation();
			}
		}, 1000);
	}

	selectAlternative(alternative: AlternativePlacement): void {
		if (!this.currentQuestion) return;

		// Deseleccionar todas las alternativas
		this.currentQuestion.alternatives.forEach((alt) => {
			alt.selected = false;
		});

		// Seleccionar la alternativa clickeada
		alternative.selected = true;
	}

	nextQuestion(): void {
		if (
			this.placementTest &&
			this.currentQuestionIndex <
				this.placementTest.questionTestResponses.length - 1
		) {
			this.currentQuestionIndex++;
			this.loadCurrentQuestion();
		}
	}

	previousQuestion(): void {
		if (this.currentQuestionIndex > 0) {
			this.currentQuestionIndex--;
			this.loadCurrentQuestion();
		}
	}

	async finishEvaluation(): Promise<void> {
		clearInterval(this.timer);
		await this.submitResults();
	}

	async submitResults(): Promise<void> {
		if (!this.placementTest) return;

		this.submittingResults = true;

		try {
			// Calcular el tiempo real tomado (en minutos)
			const realDuration = Math.floor(
				(this.placementTest.duration * 60 - this.timeRemaining) / 60,
			);

			// Crear el objeto para enviar - usando la misma interfaz pero actualizando el duration
			const placementTestResponse: EvaluationResponse = {
				...this.placementTest,
				duration: realDuration,
			};

			// Enviar resultados
			this.domainLevelResult = await this.evaluationService
				.submitPlacementTest( Number(localStorage.getItem('idUser')), placementTestResponse)
				.toPromise();
			console.log( "ofsdfas",this.domainLevelResult);

			// Mostrar modal con resultados
			this.showResultModal = true;
		} catch (error) {
			console.error('Error al enviar resultados:', error);
			this.error = 'Error al enviar los resultados de la evaluación';
		} finally {
			this.submittingResults = false;
		}
	}

	confirmResults(): void {
		this.showResultModal = false;
		// Redirigir al dashboard del estudiante
		this.router.navigate(['/aula/dashboard']);
	}

	cancelEvaluation(): void {
		clearInterval(this.timer);
		this.router.navigate(['/aula/recomendaciones']);
	}

	getProgressPercentage(): number {
		if (!this.placementTest) return 0;
		return (
			((this.currentQuestionIndex + 1) /
				this.placementTest.questionTestResponses.length) *
			100
		);
	}

	formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	getSelectedAlternativeCount(): number {
		if (!this.placementTest) return 0;
		return this.placementTest.questionTestResponses.filter((question) =>
			question.alternatives.some((alt) => alt.selected),
		).length;
	}

	ngOnDestroy(): void {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}
}
