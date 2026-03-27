import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import katex from 'katex';

@Directive({
	selector: '[katex]',
})
export class KatexDirective {
	@Input('katex') expr: string | null = null;
	@Input() displayMode = true;
	@Input() throwOnError = false;
	@Input() errorColor = '#cc0000';

	constructor(private host: ElementRef<HTMLElement>) {}

	ngOnChanges(changes: SimpleChanges): void {
		const el = this.host.nativeElement;
		el.innerHTML = ''; // Limpiar el contenido antes de renderizar

		if (!this.expr || !this.expr.trim()) return;

		// Detectar si la expresión es LaTeX o texto plano
		const isLatex = this.isLatexExpression(this.expr);

		try {
			if (isLatex) {
				// Renderizar con KaTeX solo si tiene sintaxis LaTeX
				katex.render(this.expr, el, {
					displayMode: this.displayMode,
					throwOnError: this.throwOnError,
					errorColor: this.errorColor,
					strict: 'warn', // Puedes ajustarlo según tu necesidad
				});
			} else {
				// Si no es LaTeX, solo mostrar el texto respetando los espacios
				el.textContent = this.expr; // Aquí no procesamos el texto como LaTeX
			}
		} catch (e) {
			// Si ocurre un error, mostrar el texto tal como está
			el.textContent = this.expr ?? '';
		}
	}

	/**
	 * Detecta si la expresión parece contener código LaTeX.
	 */
	private isLatexExpression(expr: string): boolean {
		// Agregar verificación para los delimitadores \(
		if (expr.startsWith('\\(') && expr.endsWith('\\)')) {
			return true;
		}
		const latexIndicators = [
			/\\frac/,
			/\\sum/,
			/\\int/,
			/\\sqrt/,
			/\\begin{.*}/,
			/\\end{.*}/,
			/\^/,
			/_/,
			/\\pi/,
			/\\theta/,
			/\\sin/,
			/\\cos/,
			/\\log/,
			/\\cdot/,
			/\\times/,
			/\\overline/,
			/\\mathbb{.*}/,
			/\\text{.*}/,
			/\\neq/,
			/\\quad/,
		];
		return latexIndicators.some((pattern) => pattern.test(expr));
	}
}
