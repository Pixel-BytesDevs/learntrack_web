import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	catchError,
	Observable,
	of,
	Subject,
	switchMap,
	takeUntil,
	timer,
} from 'rxjs';
import { Recommendation } from '../../../../core/domain/dto/recommendation/recommendation.dto';

@Injectable({
	providedIn: 'root',
})
export class RecomendacionService {
	private apiUrl = 'http://26.138.194.69:5000/api/v1/recommendations';

	private stopPolling$ = new Subject<void>();

	constructor(private http: HttpClient) {}

	/** GET simple (sin polling) */
	getRecommendation(userId: number): Observable<Recommendation | null> {
		return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
			catchError((err) => {
				console.error('Error obteniendo recomendación', err);
				return of(null);
			}),
		);
	}

	/**
	 * Polling controlado: consulta cada X ms hasta que haya una recomendación lista
	 */
	pollRecommendation(
		userId: number,
		stop$: Subject<void>,
		intervalMs = 3000,
	): Observable<Recommendation | null> {
		return timer(0, intervalMs).pipe(
			switchMap(() => this.getRecommendation(userId)),
			takeUntil(stop$),
			switchMap((response) => {
				if (!response || response.status === 'PENDING') {
					console.log('Recomendación no lista');
					return of(null);
				}
				stop$.next();
				console.log('Recomendación lista:', response as Recommendation);
				return of(response as Recommendation);
			}),
		);
	}

	/** Cancelación manual */
	stopPolling() {
		this.stopPolling$.next();
	}
}
