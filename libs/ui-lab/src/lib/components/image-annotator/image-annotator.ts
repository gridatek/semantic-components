import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { cn } from '../../utils';
import type {
  Annotation,
  AnnotationPoint,
  AnnotationTool,
} from './image-annotator-types';

@Component({
  selector: 'sc-image-annotator',
  template: `
    <div [class]="containerClass()">
      <!-- Toolbar -->
      <div class="flex items-center gap-2 p-2 border-b bg-muted/50">
        <!-- Tool Selection -->
        <div class="flex items-center gap-1 border-r pr-2">
          @for (tool of tools; track tool.id) {
            <button
              type="button"
              [class]="toolButtonClass(tool.id)"
              [attr.aria-pressed]="currentTool() === tool.id"
              [attr.aria-label]="tool.label"
              [title]="tool.label"
              (click)="selectTool(tool.id)"
            >
              <span [innerHTML]="tool.icon"></span>
            </button>
          }
        </div>

        <!-- Color Selection -->
        <div class="flex items-center gap-1 border-r pr-2">
          @for (color of colors; track color) {
            <button
              type="button"
              class="w-6 h-6 rounded border-2 transition-transform hover:scale-110"
              [class.ring-2]="currentColor() === color"
              [class.ring-offset-1]="currentColor() === color"
              [style.background-color]="color"
              [attr.aria-pressed]="currentColor() === color"
              [attr.aria-label]="'Color ' + color"
              (click)="selectColor(color)"
            ></button>
          }
        </div>

        <!-- Line Width -->
        <div class="flex items-center gap-2 border-r pr-2">
          <span class="text-xs text-muted-foreground">Width:</span>
          <input
            type="range"
            min="1"
            max="20"
            [value]="lineWidth()"
            class="w-20 h-1 accent-primary"
            (input)="onLineWidthChange($event)"
          />
          <span class="text-xs w-4">{{ lineWidth() }}</span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1 ml-auto">
          <button
            type="button"
            class="p-2 rounded hover:bg-muted transition-colors"
            title="Undo"
            [disabled]="annotations().length === 0"
            (click)="undo()"
          >
            <span [innerHTML]="undoIcon"></span>
          </button>
          <button
            type="button"
            class="p-2 rounded hover:bg-muted transition-colors"
            title="Clear All"
            [disabled]="annotations().length === 0"
            (click)="clearAll()"
          >
            <span [innerHTML]="clearIcon"></span>
          </button>
          <button
            type="button"
            class="p-2 rounded hover:bg-muted transition-colors"
            title="Download"
            (click)="download()"
          >
            <span [innerHTML]="downloadIcon"></span>
          </button>
        </div>
      </div>

      <!-- Canvas Container -->
      <div class="relative overflow-hidden" [style.cursor]="getCursor()">
        <canvas
          #imageCanvas
          class="absolute top-0 left-0"
          [width]="canvasWidth()"
          [height]="canvasHeight()"
        ></canvas>
        <canvas
          #annotationCanvas
          class="absolute top-0 left-0"
          [width]="canvasWidth()"
          [height]="canvasHeight()"
          (mousedown)="onMouseDown($event)"
          (mousemove)="onMouseMove($event)"
          (mouseup)="onMouseUp($event)"
          (mouseleave)="onMouseUp($event)"
        ></canvas>
        @if (!imageLoaded()) {
          <div
            class="flex items-center justify-center bg-muted"
            [style.width.px]="canvasWidth()"
            [style.height.px]="canvasHeight()"
          >
            <span class="text-muted-foreground">Loading image...</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageAnnotator {
  private readonly sanitizer = inject(DomSanitizer);

  readonly imageCanvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('imageCanvas');
  readonly annotationCanvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('annotationCanvas');

  readonly src = input.required<string>();
  readonly width = input(600);
  readonly height = input(400);
  readonly class = input<string>('');

  readonly annotationsChange = output<Annotation[]>();
  readonly save = output<string>();

  protected readonly annotations = signal<Annotation[]>([]);
  protected readonly currentTool = signal<AnnotationTool>('pen');
  protected readonly currentColor = signal('#ef4444');
  protected readonly lineWidth = signal(3);
  protected readonly imageLoaded = signal(false);

  private isDrawing = false;
  private currentAnnotation: Annotation | null = null;
  private startPoint: AnnotationPoint | null = null;

  private trustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  readonly tools: { id: AnnotationTool; label: string; icon: SafeHtml }[] = [];

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

  readonly undoIcon: SafeHtml;
  readonly clearIcon: SafeHtml;
  readonly downloadIcon: SafeHtml;

  protected readonly canvasWidth = computed(() => this.width());
  protected readonly canvasHeight = computed(() => this.height());

  protected readonly containerClass = computed(() =>
    cn('border rounded-lg overflow-hidden bg-background', this.class()),
  );

  constructor() {
    this.tools = [
      {
        id: 'pen',
        label: 'Pen',
        icon: this.trustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
        ),
      },
      {
        id: 'line',
        label: 'Line',
        icon: this.trustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="19" x2="19" y2="5"/></svg>`,
        ),
      },
      {
        id: 'rectangle',
        label: 'Rectangle',
        icon: this.trustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`,
        ),
      },
      {
        id: 'circle',
        label: 'Circle',
        icon: this.trustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
        ),
      },
      {
        id: 'arrow',
        label: 'Arrow',
        icon: this.trustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
        ),
      },
      {
        id: 'eraser',
        label: 'Eraser',
        icon: this.trustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>`,
        ),
      },
    ];

    this.undoIcon = this.trustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>`,
    );
    this.clearIcon = this.trustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
    );
    this.downloadIcon = this.trustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    );

    afterNextRender(() => {
      this.loadImage();
    });
  }

  private loadImage(): void {
    const imageCanvas = this.imageCanvasRef()?.nativeElement;
    if (!imageCanvas) return;

    const ctx = imageCanvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, this.canvasWidth(), this.canvasHeight());
      this.imageLoaded.set(true);
    };
    img.onerror = () => {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, this.canvasWidth(), this.canvasHeight());
      ctx.fillStyle = '#9ca3af';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Failed to load image',
        this.canvasWidth() / 2,
        this.canvasHeight() / 2,
      );
      this.imageLoaded.set(true);
    };
    img.src = this.src();
  }

  protected toolButtonClass(tool: AnnotationTool): string {
    return cn(
      'p-2 rounded transition-colors',
      this.currentTool() === tool
        ? 'bg-primary text-primary-foreground'
        : 'hover:bg-muted',
    );
  }

  selectTool(tool: AnnotationTool): void {
    this.currentTool.set(tool);
  }

  selectColor(color: string): void {
    this.currentColor.set(color);
  }

  onLineWidthChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.lineWidth.set(parseInt(input.value, 10));
  }

  getCursor(): string {
    return this.currentTool() === 'eraser' ? 'cell' : 'crosshair';
  }

  onMouseDown(event: MouseEvent): void {
    const canvas = this.annotationCanvasRef()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.isDrawing = true;
    this.startPoint = { x, y };

    if (this.currentTool() === 'eraser') {
      this.eraseAt(x, y);
    } else {
      this.currentAnnotation = {
        id: crypto.randomUUID(),
        tool: this.currentTool(),
        points: [{ x, y }],
        color: this.currentColor(),
        lineWidth: this.lineWidth(),
      };
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const canvas = this.annotationCanvasRef()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.currentTool() === 'eraser') {
      this.eraseAt(x, y);
    } else if (this.currentAnnotation) {
      if (this.currentTool() === 'pen') {
        this.currentAnnotation.points.push({ x, y });
      } else {
        this.currentAnnotation.points = [this.startPoint!, { x, y }];
      }
      this.redrawAnnotations();
    }
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isDrawing) return;

    if (this.currentAnnotation && this.currentTool() !== 'eraser') {
      this.annotations.update((anns) => [...anns, this.currentAnnotation!]);
      this.annotationsChange.emit(this.annotations());
    }

    this.isDrawing = false;
    this.currentAnnotation = null;
    this.startPoint = null;
    this.redrawAnnotations();
  }

  private eraseAt(x: number, y: number): void {
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
    this.redrawAnnotations();
  }

  private redrawAnnotations(): void {
    const canvas = this.annotationCanvasRef()?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvasWidth(), this.canvasHeight());

    // Draw saved annotations
    for (const ann of this.annotations()) {
      this.drawAnnotation(ctx, ann);
    }

    // Draw current annotation
    if (this.currentAnnotation) {
      this.drawAnnotation(ctx, this.currentAnnotation);
    }
  }

  private drawAnnotation(ctx: CanvasRenderingContext2D, ann: Annotation): void {
    ctx.strokeStyle = ann.color;
    ctx.fillStyle = ann.color;
    ctx.lineWidth = ann.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (ann.tool) {
      case 'pen':
        this.drawPen(ctx, ann.points);
        break;
      case 'line':
        this.drawLine(ctx, ann.points);
        break;
      case 'rectangle':
        this.drawRectangle(ctx, ann.points);
        break;
      case 'circle':
        this.drawCircle(ctx, ann.points);
        break;
      case 'arrow':
        this.drawArrow(ctx, ann.points);
        break;
    }
  }

  private drawPen(
    ctx: CanvasRenderingContext2D,
    points: AnnotationPoint[],
  ): void {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    points: AnnotationPoint[],
  ): void {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();
  }

  private drawRectangle(
    ctx: CanvasRenderingContext2D,
    points: AnnotationPoint[],
  ): void {
    if (points.length < 2) return;
    const width = points[1].x - points[0].x;
    const height = points[1].y - points[0].y;
    ctx.strokeRect(points[0].x, points[0].y, width, height);
  }

  private drawCircle(
    ctx: CanvasRenderingContext2D,
    points: AnnotationPoint[],
  ): void {
    if (points.length < 2) return;
    const radius = Math.sqrt(
      (points[1].x - points[0].x) ** 2 + (points[1].y - points[0].y) ** 2,
    );
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  private drawArrow(
    ctx: CanvasRenderingContext2D,
    points: AnnotationPoint[],
  ): void {
    if (points.length < 2) return;
    const [start, end] = points;
    const headLength = 15;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineTo(
      end.x - headLength * Math.cos(angle - Math.PI / 6),
      end.y - headLength * Math.sin(angle - Math.PI / 6),
    );
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(
      end.x - headLength * Math.cos(angle + Math.PI / 6),
      end.y - headLength * Math.sin(angle + Math.PI / 6),
    );
    ctx.stroke();
  }

  undo(): void {
    this.annotations.update((anns) => anns.slice(0, -1));
    this.annotationsChange.emit(this.annotations());
    this.redrawAnnotations();
  }

  clearAll(): void {
    this.annotations.set([]);
    this.annotationsChange.emit([]);
    this.redrawAnnotations();
  }

  download(): void {
    const imageCanvas = this.imageCanvasRef()?.nativeElement;
    const annotationCanvas = this.annotationCanvasRef()?.nativeElement;
    if (!imageCanvas || !annotationCanvas) return;

    // Create combined canvas
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = this.canvasWidth();
    combinedCanvas.height = this.canvasHeight();
    const ctx = combinedCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(imageCanvas, 0, 0);
    ctx.drawImage(annotationCanvas, 0, 0);

    const dataUrl = combinedCanvas.toDataURL('image/png');
    this.save.emit(dataUrl);

    // Trigger download
    const link = document.createElement('a');
    link.download = 'annotated-image.png';
    link.href = dataUrl;
    link.click();
  }

  getAnnotations(): Annotation[] {
    return this.annotations();
  }

  setAnnotations(annotations: Annotation[]): void {
    this.annotations.set(annotations);
    this.redrawAnnotations();
  }
}
