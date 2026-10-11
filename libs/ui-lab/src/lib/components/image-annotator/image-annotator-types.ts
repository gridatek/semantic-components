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
  /** Accessible name, e.g. "Red". */
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

export const DEFAULT_ANNOTATOR_COLORS: readonly ScAnnotatorColor[] = [
  { value: '#ef4444', label: 'Red' },
  { value: '#f97316', label: 'Orange' },
  { value: '#eab308', label: 'Yellow' },
  { value: '#22c55e', label: 'Green' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#000000', label: 'Black' },
  { value: '#ffffff', label: 'White' },
];

export const DEFAULT_ANNOTATOR_TOOLS: readonly ScAnnotatorToolOption[] = [
  { id: 'pen', label: 'Pen' },
  { id: 'line', label: 'Line' },
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'circle', label: 'Circle' },
  { id: 'arrow', label: 'Arrow' },
  { id: 'eraser', label: 'Eraser' },
];
