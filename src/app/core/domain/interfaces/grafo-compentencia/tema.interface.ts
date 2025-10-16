export interface Tema {
    temaId: string;
    nombre: string;
    gradoRecomendado: number;
    nivelDificultad: string;
    temasRequerido: Tema[];
}