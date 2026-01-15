import { PlacementResponse } from "../../dto/modulo-alumno/cuestionario-nivel/placement.dto";
import { UiState } from "../../enums/tipos-ui-state.enum";

export interface PlacementTestSnapshot {
	test: PlacementResponse;
	currentIndex: number;
	remainingSeconds: number;
	uiState: UiState;
	savedAt: string; // para control de expiración (opcional)
}