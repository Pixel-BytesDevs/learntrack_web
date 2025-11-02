import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackuiButtonDirective } from '../../../../shared/trackui/trackui-button/trackui-button.directive';
import { QuestionPlacement } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/question.dto';
import { KatexDirective } from '../../../../shared/directiva/katex.directive';
import { CuestionarioNivelService } from '../../../../../infraestructure/services/modulo-alumno/cuestionario-nivel/cuestionario-nivel.service';
import { filter, Observable, Subject, tap } from 'rxjs';

@Component({
	selector: 'cuestionario-nivel',
	imports: [
		NgIf,
		NgClass,
		FormsModule,
		TrackuiButtonDirective,
		KatexDirective,
		AsyncPipe,
	],
	templateUrl: './cuestionario-nivel.component.html',
	styleUrl: './cuestionario-nivel.component.scss',
})
export class CuestionarioNivelComponent implements OnInit, OnDestroy {
	questions: QuestionPlacement[] = [];
	currentIndex = 0;
	selectedAnswers: Record<number, number> = {}; // respuesta única por pregunta
	progress = 0;
	isLast = false;

	questions$!: Observable<QuestionPlacement[]>;
	loading$!: Observable<boolean>;

	private placementService = inject(CuestionarioNivelService);
	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.questions$ = this.placementService.questions$;

		this.loading$ = this.placementService.loading$;

		this.questions$
			.pipe(
				filter((qs) => !!qs && qs.length > 0),
				tap((qs) => {
					this.questions = qs;
					this.updateProgress();
				}),
			)
			.subscribe();

		this.placementService.getPlacementTest();
	}

	loadMockQuestions(): void {}

	get current(): QuestionPlacement | null {
		return this.questions[this.currentIndex] ?? null;
	}

	get total(): number {
		return this.questions.length;
	}

	get answered(): number {
		return Object.keys(this.selectedAnswers).length;
	}

	updateProgress(): void {
		const pct = Math.floor((this.answered / this.total) * 100);
		this.progress = isNaN(pct) ? 0 : pct;
		this.isLast = this.currentIndex === this.total - 1;
	}

	selectAlt(qId: number, altId: number): void {
		this.selectedAnswers[qId] = altId;
		this.updateProgress();
	}

	isSelected(qId: number, altId: number): boolean {
		return this.selectedAnswers[qId] === altId;
	}

	next(): void {
		if (this.currentIndex < this.total - 1) {
			this.currentIndex++;
			this.updateProgress();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	previous(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.updateProgress();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	get isComplete(): boolean {
		return this.answered === this.total;
	}

	submit(): void {
		console.log('Respuestas:', this.selectedAnswers);
		// Aquí puedes enviar las respuestas a tu backend
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
