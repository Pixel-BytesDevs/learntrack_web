export interface RespuestaPayload {
  preguntaId: number;
  alternativaIds: number[];
}

export interface CuestionarioPayload {
  usuarioId: number;
  respuestas: RespuestaPayload[];
}
