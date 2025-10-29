import { AlternativePlacement } from './alternative-placement.dto';

export interface QuestionPlacement {
	id: number;
	difficulty?: string;
	topicId?: string;
	sentence: string;
	grade?: number;
	expressionLatex: string;
	alternatives: AlternativePlacement[];
}
