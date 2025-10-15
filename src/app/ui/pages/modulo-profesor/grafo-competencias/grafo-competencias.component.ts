import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackuiButtonDirective } from '../../../shared/trackui/trackui-button/trackui-button.directive';
import { TrackUiIconsDirective } from '../../../shared/trackui/trackui-icons/trackui-icons.directive';
import { GrafoTemasComponent } from './components/grafo-temas/grafo-temas.component';
import { TrackuiLoadingComponent } from '../../../shared/trackui/trackui-loading/trackui-loading.component';
import { EstadoGrafoEnum } from '../../../../core/domain/enums/estado-grafo.enum';

@Component({
	selector: 'app-grafo-competencias',
	imports: [
		FormsModule,
		TrackuiButtonDirective,
		TrackUiIconsDirective,
		GrafoTemasComponent,
		TrackuiLoadingComponent,
	],
	templateUrl: './grafo-competencias.component.html',
	styleUrl: './grafo-competencias.component.scss',
})
export class GrafoCompetenciasComponent {

	readonly estadoGrafoEnum = EstadoGrafoEnum;

	link = '';
	estado: EstadoGrafoEnum = EstadoGrafoEnum.NOGENERADO;

	generarGrafo() {
		if (!this.link.trim()) return;
		this.estado = EstadoGrafoEnum.CARGANDO;
		setTimeout(() => (this.estado = this.estadoGrafoEnum.GENERADO), 2500);
	}
}
