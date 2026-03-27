import { QuestionPlacement } from "../cuestionario-nivel/question.dto";

export interface EvaluationResponse {
    id: number;
    duration: number;
    questionTestResponses: QuestionPlacement[];
    startedAt: string;
    userId: number;
}