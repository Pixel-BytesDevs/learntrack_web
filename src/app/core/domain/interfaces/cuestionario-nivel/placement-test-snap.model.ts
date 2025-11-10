import { PlacementResponse } from "../../dto/modulo-alumno/cuestionario-nivel/placement.dto";

export interface PlacementTestSnapshot {
	test: PlacementResponse;
	currentIndex: number;
	remainingSeconds: number;
	uiState: 'active' | 'loading' | 'timeout' | 'submitting' | 'completed';
	savedAt: string; // para control de expiración (opcional)
}