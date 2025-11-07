import { QuestionPlacement } from './question.dto';

export interface PlacementResponse {
	id: number;
	startedAt: string;
	endedAt?: string;
	duration: number;
	questionTestResponses: QuestionPlacement[];
}
