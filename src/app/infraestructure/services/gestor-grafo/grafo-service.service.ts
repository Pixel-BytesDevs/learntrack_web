import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GrafoCompetencia } from "../../../core/domain/interfaces/grafo-compentencia/grafo-compentencia.interface";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class GrafoService {

    private http = inject(HttpClient);


    public getGrafoAlgebra(): Observable<GrafoCompetencia> {
        return this.http.get<GrafoCompetencia>('http://localhost:8090/grafo');
    }

}