import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	Input,
	Output,
	QueryList,
} from '@angular/core';
import { ItemStepComponent } from './item-ste/item-ste.component';
import { NgTemplateOutlet } from '@angular/common';
import { TrackuiButtonDirective } from '../trackui-button/trackui-button.directive';
@Component({
	selector: 'trackui-step',
	imports: [NgTemplateOutlet, TrackuiButtonDirective],
	templateUrl: './trackui-ste.component.html',
	styleUrl: './trackui-ste.component.scss',
})
export class TrackuiStepComponent implements AfterContentInit {
	@ContentChildren(ItemStepComponent) steps!: QueryList<ItemStepComponent>;

	@Input() activeStep = 0;

	@Input() textoSiguiente = 'Siguiente';
	@Input() textoAnterior = 'Anterior';
	@Input() textoFinalizar = 'Finalizar';

	@Output() finalizado = new EventEmitter<void>();

	ngAfterContentInit() {
		if (this.steps.length === 0) {
			throw new Error('Se necesita al menos un step item como contenido');
		}
		this.updateStepStates();
	}

	get isFirstStep(): boolean {
		return this.activeStep === 0;
	}

	get isLastStep(): boolean {
		return this.activeStep === this.steps.length - 1;
	}

	private updateStepStates() {
		this.steps.forEach((step, i) => {
			step.activo = i === this.activeStep;
			step.completado = i < this.activeStep;
		});
	}

	nextStep() {
		const currentStep = this.steps.toArray()[this.activeStep];

		if (!currentStep.isValid) {
			return; // No avanza si no es válido
		}

		if (this.isLastStep) {
			currentStep.completado = true;
			this.finalizado.emit();
		} else {
			this.activeStep++;
			this.updateStepStates();
		}
	}

	prevStep() {
		if (!this.isFirstStep) {
			this.activeStep--;
			this.updateStepStates();
		}
	}
}
