export type ScAnnotationTool =
  'pen' | 'line' | 'rectangle' | 'circle' | 'arrow' | 'eraser';

/** A point in image coordinates (0…width, 0…height of the annotator). */
export interface ScAnnotationPoint {
  x: number;
  y: number;
}

export interface ScAnnotation {
  id: string;
  tool: Exclude<ScAnnotationTool, 'eraser'>;
  /** Points in image coordinates, independent of the displayed size. */
  points: ScAnnotationPoint[];
  color: string;
  /** Stroke width in image units. */
  lineWidth: number;
}

export interface ScAnnotatorColor {
  value: string;
  /** Its name — yours ("Red"): name the button with it. */
  label: string;
}

export interface ScAnnotatorToolOption {
  id: ScAnnotationTool;
  label: string;
}

export interface ScImageAnnotatorSnapshot {
  annotations: ScAnnotation[];
  currentTool: ScAnnotationTool;
  currentColor: string;
  lineWidth: number;
}
