import { UsuariosCuestionarioService } from './../../../../../infraestructure/services/modulo-alumno/usuarios-cuestionario/usuarios-cuestionario-service.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaResponse } from '../../../../../core/domain/dto/modulo-alumno/pregunta.dto';
import { CuestionarioService } from '../../../../../infraestructure/services/modulo-alumno/cuestionario/cuestionario-service.service';
import { NgClass } from '@angular/common';
import { TrackuiButtonDirective } from '../../../../shared/trackui/trackui-button/trackui-button.directive';
import { SessionStorage } from '../../../../../infraestructure/storages/session/session.storage';
import { KEYS_STORAGE } from '../../../../../core/domain/constants/key-local-storage.const';

@Component({
	selector: 'cuestionario-vark',
	imports: [NgClass, FormsModule, TrackuiButtonDirective],
	templateUrl: './cuestionario-vark.component.html',
	styleUrl: './cuestionario-vark.component.scss',
})
export class CuestionarioVarkComponent implements OnInit {
	cuestionario: PreguntaResponse[] = [];
	currentQuestionIndex = 0;

	/** Múltiple selección por pregunta: { [preguntaId]: number[] } */
	selectedAnswers: Record<number, number[]> = {};

	progress = 0;
	isLastQuestion = false;

	/** Si manejas auth real, reemplaza este valor */
	private readonly usuarioId = 1;

	constructor(
		private readonly cuestionarioService: CuestionarioService,
		private readonly usuariosCuestionarioService: UsuariosCuestionarioService,
		private readonly storageSession: SessionStorage,
		private readonly router: Router,
	) {}

	ngOnInit(): void {
		this.loadQuestions();

		// restaurar selección previa (opcional)
		const cache = this.storageSession.get(KEYS_STORAGE.cuestionario);
		if (cache) {
			try {
				//this.selectedAnswers = JSON.parse(cache);
			} catch {
				/* noop */
			}
		}
	}

	/** Carga las 16 preguntas con sus 4 alternativas (servicio hace fallback a mocks si falla) */
	loadQuestions(): void {
		this.cuestionarioService
			.getQuestions()
			.subscribe((data: PreguntaResponse[]) => {
				this.cuestionario = data ?? [];
				this.updateProgress();
			});
	}

	// ==== Getters ====
	get currentQuestion(): PreguntaResponse | null {
		return this.cuestionario[this.currentQuestionIndex] ?? null;
	}

	get total(): number {
		return this.cuestionario.length;
	}

	get answeredCount(): number {
		return this.cuestionario.filter(
			(q) => (this.selectedAnswers[q.preguntaId]?.length ?? 0) > 0,
		).length;
	}

	get firstId(): number {
		return this.cuestionario[0].preguntaId;
	}

	// ==== UI / Estado ====
	updateProgress(): void {
		if (!this.total) {
			this.progress = 0;
			this.isLastQuestion = false;
			return;
		}
		const pct = Math.floor((this.answeredCount / this.total) * 100);
		this.progress = isNaN(pct) ? 0 : pct;
		this.isLastQuestion = this.currentQuestionIndex === this.total - 1;
	}

	hasSelection(preguntaId?: number): boolean {
		if (!preguntaId) return false;
		return (this.selectedAnswers[preguntaId]?.length ?? 0) > 0;
	}

	isChecked(preguntaId: number, alternativaId: number): boolean {
		return (this.selectedAnswers[preguntaId] ?? []).includes(alternativaId);
	}

	toggleAlt(preguntaId: number, alternativaId: number, checked: boolean): void {
		const arr = this.selectedAnswers[preguntaId] ?? [];
		if (checked) {
			if (!arr.includes(alternativaId)) arr.push(alternativaId);
		} else {
			const idx = arr.indexOf(alternativaId);
			if (idx >= 0) arr.splice(idx, 1);
		}
		this.selectedAnswers[preguntaId] = arr;
		this.persistSelection();
		this.updateProgress();
	}

	nextQuestion(): void {
		if (!this.currentQuestion) return;
		if (!this.hasSelection(this.currentQuestion.preguntaId)) return;

		if (this.currentQuestionIndex < this.total - 1) {
			this.currentQuestionIndex++;
			this.updateProgress();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	previousQuestion(): void {
		if (this.currentQuestionIndex > 0) {
			this.currentQuestionIndex--;
			this.updateProgress();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	get isComplete(): boolean {
		return this.answeredCount === this.total && this.total > 0;
	}

	private persistSelection(): void {
		this.storageSession.save(
			KEYS_STORAGE.cuestionario,
			JSON.stringify(this.selectedAnswers),
		);
	}

	saveAndExit(): void {
		this.persistSelection();
		// Puedes redirigir al dashboard o a la vista inicial
		this.router.navigate(['alumno']);
	}

	onAltChange(preguntaId: number, alternativaId: number, event: Event) {
		const checked = (event.target as HTMLInputElement).checked;
		this.toggleAlt(preguntaId, alternativaId, checked);
	}

	// ==== Envío ====
	submitCuestionario(): void {
		if (!this.total) return;

		const payload = {
			usuarioId: this.usuarioId,
			respuestas: this.cuestionario.map((q) => ({
				preguntaId: q.preguntaId,
				alternativaIds: this.selectedAnswers[q.preguntaId] ?? [],
			})),
		};

		this.usuariosCuestionarioService.submitCuestionario(payload).subscribe({
			next: () => {
				this.storageSession.remove(KEYS_STORAGE.cuestionario);
				// Ir a la siguiente etapa / resultados
				this.router.navigate(['alumno/cuestionario-nivel']);
			},
			error: () => {
				// el servicio debería hacer catchError → defensivo:
				this.router.navigate(['alumno/cuestionario-nivel']);
			},
		});
	}
}
