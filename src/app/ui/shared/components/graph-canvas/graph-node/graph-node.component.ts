import { Component, computed, input } from '@angular/core';
import { GraphNode } from '../../graph-layout/graph-layout.data';
import { NgIf } from '@angular/common';

@Component({
	selector: 'graph-node',
	imports: [NgIf],
	templateUrl: 'graph-node.component.html',
	styleUrl: 'graph-node.component.scss',
})
export class GraphNodeComponent {
	node = input.required<GraphNode>();

	stateLabel = computed<string>(() => {
		switch (this.node().state) {
			case 'blocked':
				return 'Bloqueado';
			case 'excellent':
				return 'Excelente';
			case 'good':
				return 'Buen camino';
			case 'low':
				return 'Empezando';
			case 'perfect':
				return 'Perfecto';
      case 'neutral':
        return ''
		}
	});

	stateStyles = computed(() => {
		const state = this.node().state;

		const styles = {
			blocked: {
				bg: 'tw-bg-slate-50',
				border: 'tw-border-slate-200',
				hoverBorder: 'hover:tw-border-slate-300',
				accentText: 'tw-text-slate-500',
				accent: 'tw-text-slate-500',
				accentBg: 'tw-bg-slate-400',
			},
			low: {
				bg: 'tw-bg-rose-50',
				border: 'tw-border-rose-200',
				hoverBorder: 'hover:tw-border-red-300',
				accentText: 'tw-text-rose-600',
				accent: 'tw-bg-red-400',
				accentBg: 'tw-bg-rose-400',
			},
			good: {
				bg: 'tw-bg-orange-50',
				border: 'tw-border-orange-200',
				hoverBorder: 'hover:tw-border-amber-300',
				accentText: 'tw-text-orange-600',
				accent: 'tw-bg-amber-400',
				accentBg: 'tw-bg-amber-400',
			},
			excellent: {
				bg: 'tw-bg-teal-50',
				border: 'tw-border-teal-200',
				hoverBorder: 'hover:tw-border-emerald-300',
				accentText: 'tw-text-teal-600',
				accent: 'tw-bg-emerald-400',
				accentBg: 'tw-bg-teal-400',
			},
			perfect: {
				bg: 'tw-bg-amber-50',
				border: 'tw-border-amber-300',
				hoverBorder: 'hover:tw-border-emerald-300',
				accentText: 'tw-text-amber-700',
				accent: 'tw-bg-emerald-400',
				accentBg: 'tw-emerald-200/50',
			},
			neutral: {
				bg: 'tw-bg-white', // Blanco puro para máxima limpieza
				border: 'tw-border-slate-200',
				accentBg: 'tw-bg-slate-300', // Un gris suave, sin significado de alerta
				accentText: 'tw-text-slate-400',
				label: 'NODO', // Opcional, o vacío
			},
		};

		return styles[state] || styles.excellent;
	});

	bg = computed(() => this.stateStyles().bg);
	border = computed(() => this.stateStyles().border);

	accentText = computed(() => this.stateStyles().accentText);

	accentBg = computed(() => this.stateStyles().accentBg);
}
