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
		el.innerHTML = '';

		if (!this.expr || !this.expr.trim()) return;

		// Detectar si realmente contiene sintaxis LaTeX
		const hasLatexSyntax = this.isLatexExpression(this.expr);

		try {
			if (hasLatexSyntax) {
				// Renderizar con KaTeX solo si tiene sintaxis LaTeX
				katex.render(this.expr, el, {
					displayMode: this.displayMode,
					throwOnError: this.throwOnError,
					errorColor: this.errorColor,
					strict: 'warn',
				});
			} else {
				// Mostrar texto plano con formato legible
				el.textContent = this.formatPlainText(this.expr);
			}
		} catch (e) {
			el.textContent = this.expr ?? '';
		}
	}

	/**
	 * Detecta si la expresión parece contener código LaTeX.
	 */
	private isLatexExpression(expr: string): boolean {
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
		];
		return latexIndicators.some((pattern) => pattern.test(expr));
	}

	/**
	 * Mejora legibilidad del texto plano (por ejemplo, agrega espacios entre números y operadores).
	 */
	private formatPlainText(text: string): string {
		return text
			.replace(/([0-9])([+\-*/=<>])/g, '$1 $2 ') // separa número y operador
			.replace(/([+\-*/=<>])([0-9])/g, '$1 $2') // separa operador y número
			.replace(/\s{2,}/g, ' ') // normaliza espacios
			.trim();
	}
}
