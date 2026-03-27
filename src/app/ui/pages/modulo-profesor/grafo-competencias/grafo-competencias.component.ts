import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackuiButtonDirective } from '../../../shared/trackui/trackui-button/trackui-button.directive';
import { TrackUiIconsDirective } from '../../../shared/trackui/trackui-icons/trackui-icons.directive';
import { GrafoTemasComponent } from './components/grafo-temas/grafo-temas.component';
import { TrackuiLoadingComponent } from '../../../shared/trackui/trackui-loading/trackui-loading.component';
import { EstadoGrafoEnum } from '../../../../core/domain/enums/estado-grafo.enum';
import { GrafoService } from '../../../../infraestructure/services/gestor-grafo/grafo-service.service';
import { Observable } from 'rxjs';
import { GrafoCompetencia } from '../../../../core/domain/interfaces/grafo-compentencia/grafo-compentencia.interface';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-grafo-competencias',
	imports: [
		FormsModule,
		TrackuiButtonDirective,
		TrackUiIconsDirective,
		GrafoTemasComponent,
		TrackuiLoadingComponent,
		AsyncPipe
	],
	templateUrl: './grafo-competencias.component.html',
	styleUrl: './grafo-competencias.component.scss',
})
export class GrafoCompetenciasComponent implements OnInit{

	readonly estadoGrafoEnum = EstadoGrafoEnum;
	readonly grafoService = inject(GrafoService);

	grafo$!: Observable<GrafoCompetencia>;


	link = '';
	estado: EstadoGrafoEnum = EstadoGrafoEnum.NOGENERADO;

	ngOnInit(): void {
		this.grafo$ = this.grafoService.getGrafoAlgebra();
		if(this.grafo$){
			this.estado = EstadoGrafoEnum.GENERADO;
		}
	}

	generarGrafo() {
		if (!this.link.trim()) return;
		this.estado = EstadoGrafoEnum.CARGANDO;
		setTimeout(() => (this.estado = this.estadoGrafoEnum.GENERADO), 2500);
	}
}
