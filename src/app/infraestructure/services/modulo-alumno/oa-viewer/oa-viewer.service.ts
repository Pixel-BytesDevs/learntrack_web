import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, timeout } from 'rxjs';
import {
	OAResource,
	OAViewerData,
} from '../../../../core/domain/interfaces/gestor-oa/oa-resource.model';
import { OA_DATA } from '../../../../core/mocks/modulo-alumno/recomendaciones/oa-recomended-mock';
import { OA_RESOURCES_MOCK } from '../../../../core/mocks/modulo-alumno/recomendaciones/oa-resources-mock';

@Injectable({
	providedIn: 'root',
})
export class OaViewerService {
	private apiUrl = 'http://localhost:8000';
	private useMocks = false;

	constructor(private http: HttpClient) {}

	getOAViewerData(oaId: number): Observable<OAViewerData> {
		if (this.useMocks) {
			return this.getMockOAViewerData(oaId);
		}
		return this.http
			.get<OAViewerData>(`${this.apiUrl}/learning-objects/${oaId}/viewer-data`)
			.pipe(
				timeout(5000), // Timeout de 5 segundos
				catchError((error) => {
					console.warn(
						'Error al conectar con el backend, usando datos mockeados:',
						error,
					);
					return this.getMockOAViewerData(oaId);
				}),
			);
	}

	getComplementaryResources(oaId: number): Observable<OAResource[]> {
		if (this.useMocks) {
			return this.getMockComplementaryResources(oaId);
		}
		return this.http
			.get<
				OAResource[]
			>(`${this.apiUrl}/learning-objects/${oaId}/complementary-resources`)
			.pipe(
				timeout(4000),
				catchError((error) => {
					console.warn(
						'Error al obtener recursos complementarios, usando mocks:',
						error,
					);
					return this.getMockComplementaryResources(oaId);
				}),
			);
	}

	updateProgress(oaId: number, progress: number): Observable<any> {
		if (this.useMocks) {
			return this.mockUpdateProgress(oaId, progress);
		}

		return this.http
			.post(`${this.apiUrl}/progress/oa`, {
				oaId,
				progressPercentage: progress,
			})
			.pipe(
				timeout(3000),
				catchError((error) => {
					console.warn('Error al actualizar progreso, simulando éxito:', error);
					return this.mockUpdateProgress(oaId, progress);
				}),
			);
	}

	// Métodos mockeados
	private getMockOAViewerData(oaId: number): Observable<OAViewerData> {
		return of(OA_DATA).pipe(delay(800));
	}

	private getMockComplementaryResources(
		oaId: number,
	): Observable<OAResource[]> {
		return of(OA_RESOURCES_MOCK).pipe(delay(500));
	}

	private mockUpdateProgress(oaId: number, progress: number): Observable<any> {
		console.log(`[MOCK] Actualizando progreso del OA ${oaId} a ${progress}%`);
		return of({
			success: true,
			newProgress: progress,
			message: 'Progreso actualizado correctamente (modo simulación)',
		}).pipe(delay(400));
	}
}
