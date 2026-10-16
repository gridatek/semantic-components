/** What the pointer does: select and edit, draw a kind of annotation, or erase. */
export type ScImageAnnotatorNextToolName =
  'select' | ScImageAnnotatorNextKind | 'eraser';

/** The kinds of annotation. */
export type ScImageAnnotatorNextKind =
  'pen' | 'highlighter' | 'line' | 'arrow' | 'rectangle' | 'ellipse' | 'text';

/** A point, in the image's own pixels. */
export interface ScImageAnnotatorNextPoint {
  readonly x: number;
  readonly y: number;
}

/**
 * An annotation — plain data, in the image's pixels, to store and restore.
 * `points`: a pen's or highlighter's stroke; a line's or arrow's two ends;
 * a rectangle's or ellipse's two corners; a text's top-left.
 */
export interface ScImageAnnotatorNextAnnotation {
  readonly id: string;
  readonly kind: ScImageAnnotatorNextKind;
  readonly points: readonly ScImageAnnotatorNextPoint[];
  readonly color: string;
  /** The stroke's width (a text's size follows it). */
  readonly width: number;
  readonly text?: string;
}

export interface ScImageAnnotatorNextBounds {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/** What `toBlob()` makes. */
export interface ScImageAnnotatorNextBlobOptions {
  /** `image/png` (the default), `image/jpeg` or `image/webp`. */
  readonly type?: string;
  /** For JPEG and WebP: 0 to 1. */
  readonly quality?: number;
}
