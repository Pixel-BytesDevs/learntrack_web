import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {
private apiUrl = 'http://localhost:8080/api/v1/recommendations';  // URL de la API

  constructor(private http: HttpClient) {}

  getRecommendation(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener datos de recomendación', error);
        return of({
          topicName: 'Ecuaciones Lineales',
          description: 'Recurso audiovisual que guía, con ejemplos y ejercicios, el procedimiento para resolver ecuaciones lineales de primer grado.',
          recommendationText: 'Este contenido te ayudará a fortalecer tu comprensión de ecuaciones lineales, actualmente tienes un 65% de dominio.',
          currentDomain: 65,
          competence: 'Ecuaciones Lineales',
          level: 'Básico',
          learningObjective: 'Resolver ecuaciones de primer grado con una variable',
          learningStyle: 'Optimizado para estilo visual',
          progress: 68,
          prerequisites: ['Propiedades básicas de la igualdad', 'Operaciones con números enteros', 'Simplificación de expresiones']
        });
      })
    );
  }
}
