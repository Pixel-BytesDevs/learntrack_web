import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackuiButtonDirective } from '../../../../shared/trackui/trackui-button/trackui-button.directive';
import { QuestionPlacement } from '../../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/question.dto';
import { KatexDirective } from '../../../../shared/directiva/katex.directive';

@Component({
	selector: 'cuestionario-nivel',
	imports: [
		NgIf,
		NgFor,
		NgClass,
		FormsModule,
		TrackuiButtonDirective,
		KatexDirective,
	],
	templateUrl: './cuestionario-nivel.component.html',
	styleUrl: './cuestionario-nivel.component.scss',
})
export class CuestionarioNivelComponent {
	questions: QuestionPlacement[] = [];
	currentIndex = 0;
	selectedAnswers: Record<number, number> = {}; // respuesta única por pregunta
	progress = 0;
	isLast = false;

	ngOnInit(): void {
		this.loadMockQuestions();
		this.updateProgress();
	}

	loadMockQuestions(): void {
		this.questions = [
			{
				id: 1,
				sentence: '¿Cuál es el resultado de la siguiente expresión?',
				expressionLatex: '\\frac{1}{2} + \\frac{1}{3}',
				alternatives: [
					{ id: 1, sentence: '0.5', latex: '', isCorrect: false },
					{ id: 2, sentence: '0.83', latex: '', isCorrect: true },
					{ id: 3, sentence: '1.2', latex: '', isCorrect: false },
					{ id: 4, sentence: '2', latex: '', isCorrect: false },
				],
			},
			{
				id: 2,
				sentence: 'Selecciona la derivada de:',
				expressionLatex: 'f(x) = x^2 + 3x',
				alternatives: [
					{ id: 1, sentence: '', latex: '2x + 3', isCorrect: true },
					{ id: 2, sentence: '', latex: 'x^2 + 3', isCorrect: false },
					{ id: 3, sentence: '', latex: '2x^2 + 3x', isCorrect: false },
					{ id: 4, sentence: '', latex: 'x + 3', isCorrect: false },
				],
			},
		];
	}

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
}
