export type AnnotationTool =
  'pen' | 'line' | 'rectangle' | 'circle' | 'arrow' | 'eraser';

/** A point in image coordinates (0…width, 0…height of the annotator). */
export interface AnnotationPoint {
  x: number;
  y: number;
}

export interface Annotation {
  id: string;
  tool: Exclude<AnnotationTool, 'eraser'>;
  /** Points in image coordinates, independent of the displayed size. */
  points: AnnotationPoint[];
  color: string;
  /** Stroke width in image units. */
  lineWidth: number;
}

export interface AnnotatorColor {
  value: string;
  /** Accessible name, e.g. "Red". */
  label: string;
}

export interface AnnotatorToolOption {
  id: AnnotationTool;
  label: string;
}

export interface ImageAnnotatorState {
  annotations: Annotation[];
  currentTool: AnnotationTool;
  currentColor: string;
  lineWidth: number;
}

export const DEFAULT_ANNOTATOR_COLORS: readonly AnnotatorColor[] = [
  { value: '#ef4444', label: 'Red' },
  { value: '#f97316', label: 'Orange' },
  { value: '#eab308', label: 'Yellow' },
  { value: '#22c55e', label: 'Green' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#000000', label: 'Black' },
  { value: '#ffffff', label: 'White' },
];

export const DEFAULT_ANNOTATOR_TOOLS: readonly AnnotatorToolOption[] = [
  { id: 'pen', label: 'Pen' },
  { id: 'line', label: 'Line' },
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'circle', label: 'Circle' },
  { id: 'arrow', label: 'Arrow' },
  { id: 'eraser', label: 'Eraser' },
];
