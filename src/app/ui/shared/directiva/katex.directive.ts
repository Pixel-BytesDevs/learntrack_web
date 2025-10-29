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

		if (!this.expr) return;

		try {
			katex.render(this.expr, el, {
				displayMode: this.displayMode,
				throwOnError: this.throwOnError,
				errorColor: this.errorColor,
				strict: 'warn',
			});
		} catch (e) {
			el.textContent = this.expr ?? '';
		}
	}
}
