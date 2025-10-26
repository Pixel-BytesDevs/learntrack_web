import { Injectable } from '@angular/core';
import { Services } from '../../../../../environments/services/services.dev';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosCuestionarioService{
 private readonly apiUrl = Services.moduloAlumno.insertCuestionarioIrl;

  constructor(private http: HttpClient) {}

  // Llamada POST para guardar el cuestionario
  submitCuestionario(payload: {
    usuarioId: number;
    respuestas: { preguntaId: number; alternativaIds: number[] }[];
  }) {
    return this.http.post(`${this.apiUrl}`, payload).pipe(
      catchError((error) => {
        console.error('Error al enviar el cuestionario:', error);
        // Simular una respuesta "exitosa" para continuar el flujo aunque falle
        return of({ success: false, message: 'Se usó fallback (mock)', data: payload });
      })
    );
  }
}
