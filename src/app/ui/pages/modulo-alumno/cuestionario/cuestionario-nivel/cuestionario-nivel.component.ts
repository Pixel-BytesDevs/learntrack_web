import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackuiButtonDirective } from '../../../../shared/trackui/trackui-button/trackui-button.directive';
import { QuestionPlacement } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/question.dto';
import { KatexDirective } from '../../../../shared/directiva/katex.directive';
import { CuestionarioNivelService } from '../../../../../infraestructure/services/modulo-alumno/cuestionario-nivel/cuestionario-nivel.service';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { PlacementResponse } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/placement.dto';

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
	private destroy$ = new Subject<void>();
	private service = inject(CuestionarioNivelService);

	test$ = this.service.questions$;
	loading$ = this.service.loading$;

	test: PlacementResponse | null = null;
	currentIndex = 0;
	selectedAnswers: Record<number, number> = {};
	progress = 0;
	isLast = false;

	ngOnInit(): void {
		this.test$
			.pipe(
				filter(
					(t): t is PlacementResponse =>
						!!t && !!t.questionTestResponses?.length,
				),
				tap((t) => {
					this.test = structuredClone(t); 
					this.updateProgress();
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.service.getPlacementTest();
	}

	get current(): QuestionPlacement | null {
		return this.test?.questionTestResponses[this.currentIndex] ?? null;
	}

	get total(): number {
		return this.test?.questionTestResponses.length ?? 0;
	}

	get answered(): number {
		return Object.keys(this.selectedAnswers).length;
	}

	get isComplete(): boolean {
		return this.answered === this.total;
	}

	selectAlt(qId: number, altId: number): void {
		this.selectedAnswers[qId] = altId;

		// Actualizamos el modelo directamente
		const question = this.test?.questionTestResponses.find((q) => q.id === qId);
		if (question) {
			question.alternatives.forEach((alt) => (alt.selected = alt.id === altId));
		}

		this.updateProgress();
	}

	isSelected(qId: number, altId: number): boolean {
		return this.selectedAnswers[qId] === altId;
	}

	next(): void {
		if (this.currentIndex < this.total - 1) {
			this.currentIndex++;
			this.updateProgress();
			this.scrollTop();
		}
	}

	previous(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.updateProgress();
			this.scrollTop();
		}
	}

	private scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	updateProgress(): void {
		const pct = Math.floor((this.answered / this.total) * 100);
		this.progress = isNaN(pct) ? 0 : pct;
		this.isLast = this.currentIndex === this.total - 1;
	}

	/** 🧾 Enviar el PlacementTest completo */
	submit(): void {
		if (!this.test) return;

		const now = new Date().toISOString();
		const updatedTest: PlacementResponse = {
			...this.test,
			endedAt: now,
			duration: this.calculateDuration(this.test.startedAt, now),
		};

		//this.service.submitPlacementTest(updatedTest);
		console.log('PlacementTest a enviar:', updatedTest);
	}

	private calculateDuration(startedAt: string, endedAt: string): number {
		const start = new Date(startedAt).getTime();
		const end = new Date(endedAt).getTime();
		return Math.floor((end - start) / 1000); // segundos
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
