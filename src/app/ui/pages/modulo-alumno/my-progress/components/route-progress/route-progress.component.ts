import { AsyncPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import {
	Component,
	ElementRef,
	inject,
	OnInit,
	ViewChild,
} from '@angular/core';
import { Edge, Network, Node } from 'vis-network';
import { DataSet } from 'vis-data';
import { GrafoEstudianteService } from '../../../../../../infraestructure/services/modulo-alumno/grafo-estudiante/grafo-estudiante.service';
import { filter } from 'rxjs';

export interface TemaNodo {
	id: number;
	label: string;
	dominio: number;
	isActive: boolean;
	conexiones: number[];
}

@Component({
	selector: 'app-route-progress',
	imports: [NgIf, NgFor, AsyncPipe],
	templateUrl: './route-progress.component.html',
	styleUrl: './route-progress.component.scss',
})
export class RouteProgressComponent implements OnInit {
	@ViewChild('networkContainer', { static: false })
	networkContainer!: ElementRef;

	private progressService = inject(GrafoEstudianteService);
	loading$ = this.progressService.loading$;

	temas: TemaNodo[] = [
		// {
		// 	id: 1,
		// 	label: 'Matemática',
		// 	dominio: 90,
		// 	isActive: true,
		// 	conexiones: [2, 3],
		// },
		// { id: 2, label: 'Álgebra', dominio: 60, isActive: true, conexiones: [4] },
		// { id: 3, label: 'Geometría', dominio: 0, isActive: true, conexiones: [4] },
		// { id: 4, label: 'Cálculo', dominio: 0, isActive: false, conexiones: [5] },
		// {
		// 	id: 5,
		// 	label: 'Trigonometría',
		// 	dominio: 0,
		// 	isActive: false,
		// 	conexiones: [],
		// },
	];

	constructor() {}

	ngOnInit(): void {
		this.progressService.getGrafoEstudiante(1).subscribe((graph) => {
			if (graph) {
				this.temas = graph; // Renderizar el grafo con los datos obtenidos
			}
		});
	}

	get temasPorReforzar() {
		return this.temas.filter(
			(t) => t.isActive && t.dominio > 0 && t.dominio < 80,
		);
	}

	get temasDesbloqueados() {
		return this.temas.filter((t) => t.isActive && t.dominio === 0);
	}

	get temasPro() {
		return this.temas.filter((t) => t.isActive && t.dominio >= 80);
	}

	getPorcentaje(cantidad: number): string {
		const total = this.temas.filter((t) => t.isActive).length;
		return total > 0 ? ((cantidad / total) * 100).toFixed(0) : '0';
	}

	ngAfterViewInit(): void {
		this.progressService.graph$.pipe(filter((g) => !!g)).subscribe(() => {
			const t = setTimeout(() => {
				if (this.networkContainer.nativeElement) {
					this.initializeNetwork();
				}
				clearTimeout(t);
			}, 100); // Esperar al siguiente ciclo de detección de cambios
		});
	}

	initializeNetwork() {
		const nodes = new DataSet<Node>(
			this.temas.map((t) => ({
				id: t.id,
				// Texto dentro del nodo (nombre + %)
				label: `${t.label}\n${t.dominio}%`,
				color: this.getNodeColor(t),
				font: {
					color: '#111111', // texto negro
					size: 16,
					face: 'Inter',
					multi: 'html',
					align: 'center',
				},
				shape: 'circle', // círculo completo
				size: 45 + t.dominio / 5, // tamaño según dominio
				shadow: true,
				title: `${t.label} — ${t.dominio}% de dominio`,
			})),
		);

		const edges = new DataSet<Edge>(
			this.temas.flatMap((t) =>
				t.conexiones.map((c) => ({
					from: t.id,
					to: c,
					arrows: 'to',
					color: { color: '#d1d5db' },
					width: 3,
					smooth: { enabled: true, type: 'continuous', roundness: 0.3 },
				})),
			),
		);

		const options = {
			layout: {
				hierarchical: {
					enabled: true,
					direction: 'UD', // 'UD' = de arriba hacia abajo (también puedes probar 'LR' de izquierda a derecha)
					sortMethod: 'directed',
					levelSeparation: 180, // distancia entre niveles
					nodeSpacing: 180, // distancia horizontal entre nodos del mismo nivel
				},
			},
			physics: {
				enabled: false, // desactivar física para mantener la jerarquía fija
			},
			nodes: {
				borderWidth: 2,
				shadow: true,
			},
			edges: {
				smooth: {
					enabled: true,
					type: 'cubicBezier',
					forceDirection: 'vertical',
					roundness: 0.4,
				},
				shadow: false,
			},
			interaction: {
				hover: true,
				dragNodes: false, // no arrastrar nodos, mantiene el orden
				zoomView: true,
				dragView: true,
			},
		};

		const network = new Network(
			this.networkContainer.nativeElement,
			{ nodes, edges },
			options,
		);

		network.on('click', (params) => {
			if (params.nodes.length > 0) {
				const nodeId = params.nodes[0];
				const clickedNode = this.temas.find((t) => t.id === nodeId);
				console.log(`🟦 Nodo clickeado: ${clickedNode?.label}`);
			}
		});
	}

	private getNodeColor(t: TemaNodo) {
		if (!t.isActive) return { background: '#9CA3AF', border: '#6B7280' }; // bloqueado
		if (t.dominio === 0) return { background: '#F3F4F6', border: '#9CA3AF' }; // nuevo
		if (t.dominio < 80) return { background: '#FACC15', border: '#EAB308' }; // en progreso
		return { background: '#4ADE80', border: '#22C55E' }; // dominado
	}
}
