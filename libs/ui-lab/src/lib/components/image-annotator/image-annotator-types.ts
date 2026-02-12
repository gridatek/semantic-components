export type AnnotationTool =
  | 'pen'
  | 'line'
  | 'rectangle'
  | 'circle'
  | 'arrow'
  | 'text'
  | 'eraser';

export interface AnnotationPoint {
  x: number;
  y: number;
}

export interface Annotation {
  id: string;
  tool: AnnotationTool;
  points: AnnotationPoint[];
  color: string;
  lineWidth: number;
  text?: string;
}

export interface ImageAnnotatorState {
  annotations: Annotation[];
  currentTool: AnnotationTool;
  currentColor: string;
  lineWidth: number;
}
