import { IdLabel } from '../../../interfaces/base/id-label.interface';
import { AlternativePlacement } from './alternative-placement.dto';

export interface QuestionPlacement {
	id: number;
	difficulty: IdLabel<number>;
	topicId?: string;
	timeTakenInSeconds: number;
	statement: string;
	alternatives: AlternativePlacement[];
}
