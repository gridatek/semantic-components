import { Injectable, type Signal, computed, signal } from '@angular/core';
import type {
  Annotation,
  AnnotationPoint,
  AnnotationTool,
} from './image-annotator-types';

@Injectable()
export class ScImageAnnotatorState {
  src!: Signal<string>;
  width!: Signal<number>;
  height!: Signal<number>;

  onAnnotationsChange: ((annotations: Annotation[]) => void) | undefined;
  onSave: ((dataUrl: string) => void) | undefined;
  onRedraw: (() => void) | undefined;
  onDownload: (() => void) | undefined;

  readonly annotations = signal<Annotation[]>([]);
  readonly currentTool = signal<AnnotationTool>('pen');
  readonly currentColor = signal('#ef4444');
  readonly lineWidth = signal(3);
  readonly imageLoaded = signal(false);

  readonly cursor = computed(() =>
    this.currentTool() === 'eraser' ? 'cell' : 'crosshair',
  );

  readonly tools: { id: AnnotationTool; label: string }[] = [
    { id: 'pen', label: 'Pen' },
    { id: 'line', label: 'Line' },
    { id: 'rectangle', label: 'Rectangle' },
    { id: 'circle', label: 'Circle' },
    { id: 'arrow', label: 'Arrow' },
    { id: 'eraser', label: 'Eraser' },
  ];

  readonly colors = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#3b82f6',
    '#8b5cf6',
    '#000000',
    '#ffffff',
  ];

  selectTool(tool: AnnotationTool): void {
    this.currentTool.set(tool);
  }

  selectColor(color: string): void {
    this.currentColor.set(color);
  }

  setLineWidth(width: number): void {
    this.lineWidth.set(width);
  }

  addAnnotation(annotation: Annotation): void {
    this.annotations.update((anns) => [...anns, annotation]);
    this.onAnnotationsChange?.(this.annotations());
  }

  eraseAt(x: number, y: number): void {
    const eraseRadius = this.lineWidth() * 2;
    this.annotations.update((anns) =>
      anns.filter((ann) => {
        for (const point of ann.points) {
          const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
          if (distance < eraseRadius) return false;
        }
        return true;
      }),
    );
    this.onRedraw?.();
  }

  undo(): void {
    this.annotations.update((anns) => anns.slice(0, -1));
    this.onAnnotationsChange?.(this.annotations());
    this.onRedraw?.();
  }

  clearAll(): void {
    this.annotations.set([]);
    this.onAnnotationsChange?.([]);
    this.onRedraw?.();
  }

  download(): void {
    this.onDownload?.();
  }

  getAnnotations(): Annotation[] {
    return this.annotations();
  }

  setAnnotations(annotations: Annotation[]): void {
    this.annotations.set(annotations);
    this.onRedraw?.();
  }
}
