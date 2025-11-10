import { NgClass, NgStyle } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
} from '@angular/core';

@Component({
	selector: 'timer-component',
	imports: [],
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnChanges, OnDestroy {
	@Input() seconds: number = 0;
	@Output() timeUp = new EventEmitter<void>();
	@Output() tick = new EventEmitter<number>();

	displayTime: string = '00:00';
	private intervalId?: ReturnType<typeof setInterval>;

	private isRunning = false;

	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes['seconds'] &&
			!this.isRunning && // 👈 solo si no está corriendo
			changes['seconds'].currentValue > 0
		) {
			this.startTimer();
		}
	}

	private startTimer(): void {
		if (this.isRunning) return;
		this.isRunning = true;
		this.updateDisplay();

		this.intervalId = setInterval(() => {
			if (this.seconds > 0) {
				this.seconds--;
				this.tick.emit(this.seconds);
				this.updateDisplay();
			} else {
				this.stopTimer();
				this.timeUp.emit();
			}
		}, 1000);
	}

	private updateDisplay(): void {
		const minutes = Math.floor(this.seconds / 60);
		const secs = this.seconds % 60;
		this.displayTime = `${this.pad(minutes)}:${this.pad(secs)}`;
	}

	private pad(value: number): string {
		return value.toString().padStart(2, '0');
	}

	private stopTimer(): void {
		if (this.intervalId) clearInterval(this.intervalId);
		this.isRunning = false;
	}

	ngOnDestroy(): void {
		this.stopTimer();
	}
}
