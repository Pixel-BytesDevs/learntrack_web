import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../../infraestructure/bebux/loading.service';

@Component({
	selector: 'trackui-loading',
	imports: [AsyncPipe],
	templateUrl: './trackui-loading.component.html',
	styleUrl: './trackui-loading.component.scss',
})
export class TrackuiLoadingComponent {
	cubes = Array(3).fill(0);
	loading$ = inject(LoadingService).loading$;
}
