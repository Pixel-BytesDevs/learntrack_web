import { Tema } from "./tema.interface";

export interface GrafoCompetencia {
    id: number;
    descripcion: string;
    nivel: string;
    area: string;
    curriculoRef: string;
    temas: Tema[];
}