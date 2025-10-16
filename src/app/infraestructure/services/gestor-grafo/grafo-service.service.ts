import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GrafoCompetencia } from "../../../core/domain/interfaces/grafo-compentencia/grafo-compentencia.interface";


@Injectable({
    providedIn: 'root'
})
export class GrafoService {

    private http = inject(HttpClient);


    getGrafoAlgebra() {
        this.http.get<GrafoCompetencia>('localhost:8080/grafo')
    }

}