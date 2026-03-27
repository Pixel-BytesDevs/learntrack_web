import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluationResponse } from '../../../../core/domain/dto/modulo-alumno/evaluacion/evaluation.dto';
import { Services } from '../../../../../environments/services/services.dev';

export interface EvaluateRecommendationRequest {
  userId: number;
  topicId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private apiUrl = Services.moduloAlumno.evaluacion;

  constructor(private http: HttpClient) {}

  evaluateRecommendation(request: EvaluateRecommendationRequest): Observable<EvaluationResponse> {
    return this.http.post<EvaluationResponse>(this.apiUrl, request);
  }

  submitPlacementTest(id: number, placementTest: EvaluationResponse): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}/submit`, placementTest);
  }
}
