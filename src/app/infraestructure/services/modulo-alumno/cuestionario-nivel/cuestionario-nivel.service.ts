import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { QuestionPlacement } from '../../../../core/domain/dto/modulo-alumno/cuestionario-nivel/question.dto';
import { Services } from '../../../../../environments/services/services.dev';

@Injectable({
	providedIn: 'root',
})
export class CuestionarioNivelService {
	private apiUrl = Services.moduloAlumno.cuestionarioNivel;
	private http = inject(HttpClient);

	private readonly _questions$ = new BehaviorSubject<QuestionPlacement[]>([]);
	private readonly _loading$ = new BehaviorSubject<boolean>(false);

	questions$ = this._questions$.asObservable();
	loading$ = this._loading$.asObservable();

	questions = [
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

	getPlacementTest() {
		this._loading$.next(true)

		return this.http.get<QuestionPlacement[]>(this.apiUrl).pipe(
			tap(() => this._loading$.next(false)),
			catchError((error) => {
				console.error('Error al obtener placement del backend');
				return of([]);
			}),
		)
		.subscribe(questions => this._questions$.next(questions));
	}

	refresh() {
		this.getPlacementTest();
	}

	getQuestionById(id: number) {
		return this.questions.find(q => q.id === id) || null;
	}
}
