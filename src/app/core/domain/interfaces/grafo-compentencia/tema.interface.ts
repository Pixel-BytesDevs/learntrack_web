export interface Tema {
    temaId: string;
    nombre: string;
    gradoRecomendado: number;
    nivelDificultad: string;
    temasRequeridos: Tema[];
}