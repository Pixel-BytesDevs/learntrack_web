export interface OAResource {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'image' | 'exercise' | 'link' | 'reading' | 'summary';
  duration?: number; // en minutos, solo para video/audio
  description: string;
  s3Key: string;
  url: string;
  fileExtension: string;
  fileSize?: number;
  estimatedDuration?: number; // en minutos
}

export interface OAViewerData {
  mainResource: OAResource;
  complementaryResources: OAResource[];
  learningObjectives: string[];
  prerequisites: string[];
  competency: string;
  nivel: string,
  progress: number;
}