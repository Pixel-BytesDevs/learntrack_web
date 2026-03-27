export interface Alternativa {
  alternativaId: number;
  alternativa: string;
}

export interface PreguntaResponse {
  preguntaId: number;
  sentencia: string;
  alternativas: Alternativa[];
}