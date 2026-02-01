import { Directive, HostBinding, Input } from '@angular/core';

export type NodeState = 'blocked' | 'low' | 'good' | 'perfect';

@Directive({
	selector: '[graphNode]',
})
export class TrackuiNodeDirective {
	@Input({ required: true }) graphNode!: 'blocked' | 'low' | 'good' | 'perfect';

	@HostBinding('class.graph-node') base = true;

	@HostBinding('class.blocked') get blocked() {
		return this.graphNode === 'blocked';
	}
	@HostBinding('class.low') get low() {
		return this.graphNode === 'low';
	}
	@HostBinding('class.good') get good() {
		return this.graphNode === 'good';
	}
	@HostBinding('class.perfect') get perfect() {
		return this.graphNode === 'perfect';
	}
}
