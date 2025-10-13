import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackuiButtonDirective } from '../../../shared/trackui/trackui-button/trackui-button.directive';
import { TrackUiIconsDirective } from '../../../shared/trackui/trackui-icons/trackui-icons.directive';
import { GrafoTemasComponent } from './components/grafo-temas/grafo-temas.component';


@Component({
	selector: 'app-grafo-competencias',
	imports: [FormsModule, TrackuiButtonDirective, TrackUiIconsDirective, GrafoTemasComponent],
	templateUrl: './grafo-competencias.component.html',
	styleUrl: './grafo-competencias.component.scss',
})
export class GrafoCompetenciasComponent {
	link = '';
	estado: 'vacio' | 'cargando' | 'listo' = 'vacio';

	generarGrafo() {
		if (!this.link.trim()) return;
		this.estado = 'cargando';
		setTimeout(() => (this.estado = 'listo'), 2500);
	}
}
