import { Component, computed, input } from '@angular/core';

@Component({
	selector: 'logo-learntrack',
	imports: [],
	templateUrl: 'logo-learntrack.component.html',
	styleUrls: ['logo-learntrack.component.scss'],
})
export class LogoLearnTrackComponent {
	heigth = input<number>(70);
	width = input<number>(70);

	heigthLabel = computed<number>(() => this.heigth() / 3);
	widthLabel = computed<number>(() => this.width() * 2);
}
