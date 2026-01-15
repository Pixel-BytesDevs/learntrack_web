import {
	AsyncPipe,
	NgClass,
} from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackuiButtonDirective } from '../../../../shared/trackui/trackui-button/trackui-button.directive';
import { QuestionPlacement } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/question.dto';
import { KatexDirective } from '../../../../shared/directiva/katex.directive';
import { CuestionarioNivelService } from '../../../../../infraestructure/services/modulo-alumno/cuestionario-nivel/cuestionario-nivel.service';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { PlacementResponse } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/placement.dto';
import { TimerComponent } from './components/timer.components';
import { CuestionarioNivelStateService } from '../../../../../presentation/cuestionario-nivel/cuestionario-nivel-state.service';
import { UiState } from '../../../../../core/domain/enums/tipos-ui-state.enum';

@Component({
	selector: 'cuestionario-nivel',
	imports: [
		TimerComponent,
		NgClass,
		FormsModule,
		TrackuiButtonDirective,
		KatexDirective,
	],
	templateUrl: './cuestionario-nivel.component.html',
	styleUrl: './cuestionario-nivel.component.scss',
})
export class CuestionarioNivelComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	state = inject(CuestionarioNivelStateService);

	test$ = this.state.test$;
	loading$ = this.state.loading$;

	test: PlacementResponse | null = null;
	currentIndex = 0;
	selectedAnswers: Record<number, number> = {};
	progress = 0;
	isLast = false;

	private intervalId?: ReturnType<typeof setInterval>;
	displayTime: string = '00:00';

	answeredIndices = new Set<number>();

	uiState: UiState = UiState.LOADING ;

	remainingSeconds = 0;

	ngOnInit(): void {
		this.state.loadTest();

		// 🔹 Restaurar test
		this.state.test$
			.pipe(
				filter(
					(t): t is PlacementResponse =>
						!!t && !!t.questionTestResponses?.length,
				),
				tap((t) => {
					this.test = structuredClone(t);
					this.rehydrateSelectedAnswers(t);
					this.updateProgress();
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		// 🔹 Restaurar índice actual (mantiene la pregunta actual al recargar)
		this.state.currentIndex$.pipe(takeUntil(this.destroy$)).subscribe((i) => {
			this.currentIndex = i;
			this.scrollTop(); // 👈 opcional, asegura que la vista se actualice correctamente
		});

		// 🔹 Restaurar tiempo restante
		this.state.remainingSeconds$
			.pipe(takeUntil(this.destroy$))
			.subscribe((s) => (this.remainingSeconds = s));

		// 🔹 Restaurar estado de UI
		this.state.uiState$
			.pipe(takeUntil(this.destroy$))
			.subscribe((state) => (this.uiState = state));
	}

	ngOnChanges(): void {}

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
		this.state.selectAlternative(qId, altId);
		this.answeredIndices.add(this.currentIndex);
		this.updateProgress();
	}

	isSelected(qId: number, altId: number): boolean {
		return this.selectedAnswers[qId] === altId;
	}

	next(): void {
		if (this.currentIndex < this.total - 1) {
			this.currentIndex++;
			this.state.updateCurrentIndex(this.currentIndex); // 👈 guarda
			this.updateProgress();
			this.scrollTop();
		}
	}

	previous(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.state.updateCurrentIndex(this.currentIndex); // 👈 guarda
			this.updateProgress();
			this.scrollTop();
		}
	}

	onTick(seconds: number) {
		this.state.updateRemainingTime(seconds);
	}

	private scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	updateProgress(): void {
		const pct = Math.floor((this.answered / this.total) * 100);
		this.progress = isNaN(pct) ? 0 : pct;
		this.isLast = this.currentIndex === this.total - 1;
	}

	onTimerEnd(): void {
		if (this.test) {
			this.uiState = UiState.TIMEOUT;
			// mostramos mensaje 2 segundos y luego enviamos
			setTimeout(() => {
				this.uiState = UiState.SUBMITTING;
				this.state.submitTest(this.test!);
				setTimeout(() => (this.uiState = UiState.COMPLETED), 2000);
			}, 2000);
		}
	}

	submit(): void {
		if (!this.test) return;
		this.uiState = UiState.SUBMITTING;
		this.state.submitTest(this.test);
		setTimeout(() => (this.uiState = UiState.COMPLETED), 2000);
	}

	private calculateDuration(startedAt: string, endedAt: string): number {
		const start = new Date(startedAt).getTime();
		const end = new Date(endedAt).getTime();
		return Math.floor((end - start) / 1000);
	}

	private rehydrateSelectedAnswers(test: PlacementResponse) {
		this.selectedAnswers = {};
		test.questionTestResponses.forEach((q) => {
			const selectedAlt = q.alternatives.find((a) => a.selected);
			if (selectedAlt) {
				this.selectedAnswers[q.id] = selectedAlt.id;
				this.answeredIndices.add(test.questionTestResponses.indexOf(q));
			}
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
