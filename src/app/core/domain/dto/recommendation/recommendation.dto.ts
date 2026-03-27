import { OAData } from "./oa-data.dto";

export interface Recommendation {
    topicId: string;
    topicName: string;
    domainLevel: number;
    learningObjects: OAData[];
    status?: 'PENDING' | 'READY' | 'FAILED';
}