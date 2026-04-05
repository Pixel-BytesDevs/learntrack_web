import { NgClass } from '@angular/common';
import {
	Component,
	computed,
	forwardRef,
	Input,
	input,
	signal,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TrackuiIcons } from '../../../../core/domain/types/tipos-icons.type';
import { TrackUiIconsDirective } from '../trackui-icons/trackui-icons.directive';

@Component({
	selector: 'trackui-input',
	imports: [TrackUiIconsDirective, NgClass],
	templateUrl: 'trackui-input.component.html',
	styleUrl: 'trackui-input.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TrackuiInputComponent),
			multi: true,
		},
	],
})
export class TrackuiInputComponent implements ControlValueAccessor {
	@Input() formControl!: FormControl;
	label = input.required<string>();
	icono = input<TrackuiIcons>();
	isErasable = input<boolean>(false);
	typeImput = input<string>("text");
	valorInput = signal<string>('');

	errorMessage = input<string | undefined | null>(null);
	hasError = computed<boolean>(() => {
		return this.errorMessage() !== null;
	});

	isDisabled = signal<boolean>(false);
	classIcon = computed<string>(() => {
		if (this.isDisabled()) {
			return 'input-icon--disabled';
		}

		if (this.errorMessage() !== null && this.formControl.touched) {
			return 'input-icon--error';
		}
		return 'input-icon--active';
	});

	onChange = (value: string) => {};
	onTouched = () => {};

	writeValue(obj: string): void {
		this.valorInput.set(obj);
	}

	registerOnChange(fn: (valor: string) => {}): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => {}): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	public listenChanges(event: Event) {
		const valor = (event.target as HTMLInputElement).value;
		this.valorInput.set(valor);
		this.onChange(valor);
	}

	public alTocar() {
		this.onTouched();
	}

	public cleanInput() {
		this.valorInput.set('');

		// si ha o tiene error no actualiza el form pi
		if (this.hasError()) {
			return;
		}

		this.onChange(this.valorInput());
	}
}
