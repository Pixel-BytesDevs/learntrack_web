import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'trackui-loading',
	imports: [],
	templateUrl: './trackui-loading.component.html',
	styleUrl: './trackui-loading.component.scss',
})
export class TrackuiLoadingComponent {
	cubes = Array(3).fill(0);
}
