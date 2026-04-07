import { TipoEstiloVark } from './../../../../../core/domain/enums/tipo-estilo-vark.enum';
import { Component, inject } from '@angular/core';
import {
	CuestionarioResponse,
	EstiloVark,
} from '../../../../../core/domain/dto/modulo-alumno/resultado-vark/detalle-respuesta.dto';
import { UsuariosCuestionarioService } from '../../../../../infraestructure/services/modulo-alumno/usuarios-cuestionario/usuarios-cuestionario-service.service';
import { NgStyle, TitleCasePipe } from '@angular/common';
import {
	CompetenciaInicialDTO,
	CompetenciaProgresoDTO,
} from '../../../../../core/domain/dto/modulo-alumno/resultado-vark/resultados.dto';
import { Router, RouterLink } from '@angular/router';
import { TrackuiButtonDirective } from '../../../../shared/trackui/trackui-button/trackui-button.directive';
import { AuthService } from '../../../../../infraestructure/services/auth/auth.service';
import { TokenService } from '../../../../../infraestructure/services/token/token.service';

@Component({
	selector: 'resultados',
	imports: [NgStyle, TitleCasePipe, TrackuiButtonDirective],
	templateUrl: './resultados.component.html',
	styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent {
	resultado?: CuestionarioResponse;
	estiloPredominante?: EstiloVark;
	descripcion: string = '';
	competenciasProgreso: CompetenciaProgresoDTO[] = [];
	competenciaInicial!: CompetenciaInicialDTO;
	protected readonly TipoEstiloVark = TipoEstiloVark;
	private authService = inject(AuthService);
	private tokenService = inject(TokenService);
	private router = inject(Router);

	constructor(private cuestionarioService: UsuariosCuestionarioService) {}

	ngOnInit() {
		this.resultado = this.cuestionarioService.resultadoCuestionario;

		if (this.resultado) {
			this.estiloPredominante = this.resultado.estilos.reduce(
				(prev, curr) => (curr.porcentaje > prev.porcentaje ? curr : prev),
				this.resultado.estilos[0], // valor inicial
			);

			this.descripcion = this.obtenerDescripcion(
				this.estiloPredominante?.tipo ?? '',
			);
		}

		this.competenciasProgreso = [
			{ nombre: 'Ecuaciones lineales', porcentaje: 80 },
			{ nombre: 'Expresiones algebraicas', porcentaje: 60 },
			{ nombre: 'Factorización', porcentaje: 40 },
			{ nombre: 'Ecuaciones cuadráticas', porcentaje: 20 },
		];

		this.competenciaInicial = {
			competencia: 'Ecuaciones lineales',
			dificultad: 'Intermedio',
			descripcion:
				'Comenzamos en esta competencia para consolidar lo ya dominado (80%) y progresar rápidamente hacia problemas con múltiples pasos y variables.',
		};
	}

	obtenerDescripcion(tipo: string): string {
		switch (tipo) {
			case TipoEstiloVark.VISUAL:
				return 'Aprendes mejor con imágenes, diagramas y ejemplos paso a paso. Las explicaciones con esquemas y colores facilitan tu comprensión y memoria.';
			case TipoEstiloVark.AUDITIVO:
				return 'Aprendes mejor escuchando y hablando. Las discusiones, explicaciones orales y grabaciones te ayudan a retener información.';
			case TipoEstiloVark.LECTURA_ESCRITURA:
				return 'Prefieres aprender leyendo y escribiendo. Las notas, listas y textos detallados son tus mejores herramientas.';
			case TipoEstiloVark.KINESTESICO:
				return 'Aprendes mejor haciendo. Las experiencias prácticas, simulaciones y ejemplos concretos son los más efectivos para ti.';
			default:
				return '';
		}
	}

	completeCuestionary(): void {
		const isGoogle = this.tokenService.isGoogleUser();

		const request$ = isGoogle
			? this.authService.completeVarkGoogle(this.tokenService.getUsername())
			: this.authService.completeVark(this.tokenService.getUsername());

		request$.subscribe({
			next: () => {
				console.log('VARK completado');

				// 🔥 REFRESH TOKEN AQUÍ
				this.authService.refreshToken().subscribe({
					next: (tokens) => {
						console.log('TOKEN REFRESCADO', tokens);

						this.tokenService.setTokens(
							tokens.access_token,
							tokens.refresh_token,
						);

						// ✅ ahora sí rediriges con token actualizado
						this.router.navigate(['/alumno']);
					},
					error: (err) => {
						console.error('Error refrescando token', err);
					},
				});
			},
			error: (err) => {
				console.error('Error completando VARK', err);
			},
		});
	}
}
