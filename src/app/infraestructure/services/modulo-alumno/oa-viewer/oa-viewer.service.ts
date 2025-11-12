  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { catchError, delay, map, Observable, of, timeout } from 'rxjs';
  import { OAResource, OAViewerData } from '../../../../core/domain/interfaces/gestor-oa/oa-resource.model';
import { OA_DATA } from '../../../../core/mocks/modulo-alumno/recomendaciones/oa-recomended-mock';
import { OA_RESOURCES_MOCK } from '../../../../core/mocks/modulo-alumno/recomendaciones/oa-resources-mock';

  @Injectable({
    providedIn: 'root'
  })
  export class OaViewerService {
  private apiUrl = 'http://localhost:8000'; // Tu backend
  private useMocks = false; // Flag para forzar mocks si es necesario

  constructor(private http: HttpClient) { }

  getOAViewerData(oaId: number): Observable<OAViewerData> {
    if (this.useMocks) {
      return this.getMockOAViewerData(oaId);
    }
    return this.http.get<OAViewerData>(`${this.apiUrl}/learning-objects/${oaId}/viewer-data`).pipe(
      timeout(5000), // Timeout de 5 segundos
      catchError((error) => {
        console.warn('Error al conectar con el backend, usando datos mockeados:', error);
        return this.getMockOAViewerData(oaId);
      })
    );
  }

  getResourceUrl(resourceId: number): Observable<{ url: string }> {
    if (this.useMocks) {
      return this.getMockResourceUrl(resourceId);
    }
    return this.http.get<{ url: string }>(`${this.apiUrl}/resources/${resourceId}/url`).pipe(
      timeout(3000),
      catchError((error) => {
        console.warn('Error al obtener URL del recurso, usando mock:', error);
        return this.getMockResourceUrl(resourceId);
      })
    );
  }

  getComplementaryResources(oaId: number): Observable<OAResource[]> {
    if (this.useMocks) {
      return this.getMockComplementaryResources(oaId);
    }
    return this.http.get<OAResource[]>(`${this.apiUrl}/learning-objects/${oaId}/complementary-resources`).pipe(
      timeout(4000),
      catchError((error) => {
        console.warn('Error al obtener recursos complementarios, usando mocks:', error);
        return this.getMockComplementaryResources(oaId);
      })
    );
  }

  updateProgress(oaId: number, progress: number): Observable<any> {
    if (this.useMocks) {
      return this.mockUpdateProgress(oaId, progress);
    }

    return this.http.post(`${this.apiUrl}/progress/oa`, {
      oaId,
      progressPercentage: progress
    }).pipe(
      timeout(3000),
      catchError((error) => {
        console.warn('Error al actualizar progreso, simulando éxito:', error);
        return this.mockUpdateProgress(oaId, progress);
      })
    );
  }

  // Métodos mockeados
  private getMockOAViewerData(oaId: number): Observable<OAViewerData> {
    return of(OA_DATA).pipe(delay(800));
  }

  private getMockResourceUrl(resourceId: number): Observable<{ url: string }> {
    const mockUrls: { [key: number]: string } = {
      1: 'https://app-tesis-oa.s3.us-east-2.amazonaws.com/Sebasti%C3%A1n+Yatra+-+Dos+Oruguitas+(From+Encanto).mp4',
      2: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      3: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      4: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      5: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      6: 'https://es.khanacademy.org/math/algebra',
      7: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    };

    const url = mockUrls[resourceId] || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    
    return of({ url }).pipe(delay(300));
  }

  private getMockComplementaryResources(oaId: number): Observable<OAResource[]> {
    return of(OA_RESOURCES_MOCK).pipe(delay(500));
  }

  private mockUpdateProgress(oaId: number, progress: number): Observable<any> {
    console.log(`[MOCK] Actualizando progreso del OA ${oaId} a ${progress}%`);
    return of({ 
      success: true, 
      newProgress: progress,
      message: 'Progreso actualizado correctamente (modo simulación)'
    }).pipe(delay(400));
  }

  // Método para forzar el uso de mocks (útil para desarrollo)
  setUseMocks(useMocks: boolean): void {
    this.useMocks = useMocks;
    console.log(`Modo mocks: ${useMocks ? 'ACTIVADO' : 'DESACTIVADO'}`);
  }

  // Método para verificar conectividad con el backend
  checkBackendConnection(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/health`, { responseType: 'text' }).pipe(
      timeout(3000),
      map(() => true),
      catchError(() => of(false))
    );
  }
  }
