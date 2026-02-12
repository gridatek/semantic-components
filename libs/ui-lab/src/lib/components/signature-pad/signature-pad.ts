import {
  Directive,
  InjectionToken,
  input,
  signal,
  computed,
} from '@angular/core';

export interface ScSignaturePoint {
  x: number;
  y: number;
  pressure?: number;
}

export interface ScSignatureLine {
  points: ScSignaturePoint[];
  color: string;
  width: number;
}

export const SC_SIGNATURE_PAD = new InjectionToken<ScSignaturePad>(
  'SC_SIGNATURE_PAD',
);

@Directive({
  selector: '[sc-signature-pad]',
  exportAs: 'scSignaturePad',
  providers: [{ provide: SC_SIGNATURE_PAD, useExisting: ScSignaturePad }],
  host: {
    'data-slot': 'signature-pad',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScSignaturePad {
  readonly disabled = input<boolean>(false);
  readonly backgroundColor = input<string>('#ffffff');

  // Pen settings (writable signals for customization)
  readonly penColor = signal<string>('#000000');
  readonly penWidth = signal<number>(2);

  // Internal state
  readonly lines = signal<ScSignatureLine[]>([]);
  readonly isDrawing = signal(false);
  readonly currentLine = signal<ScSignaturePoint[]>([]);
  readonly canvasElement = signal<HTMLCanvasElement | null>(null);

  // Computed state
  readonly canUndo = computed(() => this.lines().length > 0);
  readonly isEmpty = computed(() => this.lines().length === 0);

  // Add a line to the signature
  addLine(line: ScSignatureLine): void {
    this.lines.update((lines) => [...lines, line]);
  }

  // Clear all lines
  clear(): void {
    this.lines.set([]);
    this.currentLine.set([]);
  }

  // Undo last line
  undo(): void {
    if (this.lines().length === 0) return;
    this.lines.update((lines) => lines.slice(0, -1));
  }

  // Get canvas context
  getContext(): CanvasRenderingContext2D | null {
    return this.canvasElement()?.getContext('2d') ?? null;
  }

  // Get data URL
  toDataURL(
    type: 'image/png' | 'image/jpeg' = 'image/png',
    quality?: number,
  ): string {
    const canvas = this.canvasElement();
    if (!canvas) return '';
    return canvas.toDataURL(type, quality);
  }

  // Get blob
  toBlob(
    callback: (blob: Blob | null) => void,
    type?: string,
    quality?: number,
  ): void {
    const canvas = this.canvasElement();
    if (!canvas) {
      callback(null);
      return;
    }
    canvas.toBlob(callback, type, quality);
  }
}
