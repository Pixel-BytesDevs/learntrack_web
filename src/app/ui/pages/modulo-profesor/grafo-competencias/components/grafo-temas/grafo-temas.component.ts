import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild,
} from '@angular/core';
import { Network, Node, Edge } from 'vis-network';
import { DataSet } from 'vis-data';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-grafo-temas',
	imports: [],
	template: `
		<div class="tw-relative tw-w-full tw-h-full">
			<div
				#graphContainer
				class="tw-absolute tw-inset-0 tw-bg-inverse tw-rounded-xl tw-shadow-md"
			></div>

			<!-- Tooltip -->
			<div
				class="tw-absolute tw-top-2 tw-right-2 tw-bg-primary-50 tw-text-primary-700 tw-text-sm tw-rounded-lg px-md py-xs tw-shadow-sm tw-flex tw-items-center gap-xs tw-opacity-90 hover:tw-opacity-100 tw-transition"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="tw-w-4 tw-h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
					/>
				</svg>
				<span>Arrastra para mover, usa scroll para hacer zoom</span>
			</div>
		</div>
	`,
	styleUrl: 'grafo-temas.component.scss',
})
export class GrafoTemasComponent implements AfterViewInit, OnDestroy {
	@ViewChild('graphContainer') graphContainer!: ElementRef<HTMLDivElement>;
	@Input() temas: { id: number; nombre: string; prereqs?: number[] }[] = [];

	private network?: Network;
	private resizeObserver?: ResizeObserver;
  private resizeTimeout?: any;

	ngAfterViewInit() {
		const nodes = new DataSet(
			this.temas.map((t) => ({
				id: t.id,
				label: t.nombre,
				color: {
					background: '#E9F5FF',
					border: '#0077B6',
					highlight: { background: '#0077B6', border: '#023E8A' },
				},
				font: { color: '#023E8A', face: 'Poppins', size: 14 },
				shape: 'box',
				borderWidth: 1.5,
				shadow: { enabled: true, color: 'rgba(0,0,0,0.05)', size: 5 },
			})),
		);

		const edges = new DataSet<Edge>(
			this.temas.flatMap((t) =>
				(t.prereqs ?? []).map((p) => ({
					from: p,
					to: t.id,
					arrows: 'to',
					color: { color: '#A0AEC0', highlight: '#0077B6' },
					smooth: { enabled: true, type: 'cubicBezier', roundness: 0.5 },
				})),
			),
		);

		const options = {
			layout: { hierarchical: false },
			physics: {
				stabilization: true,
				barnesHut: { gravitationalConstant: -8000, springLength: 120 },
			},
			interaction: {
				hover: true,
				zoomView: true,
				dragNodes: true,
			},
		};

		this.network = new Network(
			this.graphContainer.nativeElement,
			{ nodes, edges },
			options,
		);

		// 👇 Observa los cambios de tamaño del contenedor
		this.resizeObserver = new ResizeObserver(() => {
			this.network?.redraw();
		});

		this.resizeObserver.observe(this.graphContainer.nativeElement);

		this.network.on('click', (params) => {
			if (params.nodes.length > 0) {
				const clickedId = params.nodes[0];
				const tema = this.temas.find((t) => t.id === clickedId);
				console.log('Tema seleccionado:', tema);
			}
		});
	}

	ngOnDestroy() {
		this.resizeObserver?.disconnect();
		if (this.network) {
			this.network.destroy();
			this.network = undefined;
		}
	}
}
