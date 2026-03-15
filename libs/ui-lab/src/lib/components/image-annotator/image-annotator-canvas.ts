import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';
import type { Annotation, AnnotationPoint } from './image-annotator-types';

@Component({
  selector: 'div[scImageAnnotatorCanvas]',
  template: `
    <canvas
      #imageCanvas
      class="absolute top-0 left-0"
      [width]="state.width()"
      [height]="state.height()"
    ></canvas>
    <canvas
      #annotationCanvas
      class="absolute top-0 left-0"
      [width]="state.width()"
      [height]="state.height()"
      (mousedown)="onMouseDown($event)"
      (mousemove)="onMouseMove($event)"
      (mouseup)="onMouseUp()"
      (mouseleave)="onMouseUp()"
    ></canvas>
    @if (!state.imageLoaded()) {
      <div
        class="bg-muted flex items-center justify-center"
        [style.width.px]="state.width()"
        [style.height.px]="state.height()"
      >
        <span class="text-muted-foreground">Loading image...</span>
      </div>
    }
  `,
  host: {
    'data-slot': 'image-annotator-canvas',
    '[class]': 'class()',
    '[style.width.px]': 'state.width()',
    '[style.height.px]': 'state.height()',
    '[style.cursor]': 'state.cursor()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageAnnotatorCanvas {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScImageAnnotatorState);

  private readonly imageCanvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('imageCanvas');
  private readonly annotationCanvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('annotationCanvas');

  private isDrawing = false;
  private currentAnnotation: Annotation | null = null;
  private startPoint: AnnotationPoint | null = null;

  protected readonly class = computed(() =>
    cn('relative overflow-hidden', this.classInput()),
  );

  constructor() {
    this.state.onRedraw = () => this.redrawAnnotations();
    this.state.onDownload = () => this.performDownload();

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
      ctx.drawImage(img, 0, 0, this.state.width(), this.state.height());
      this.state.imageLoaded.set(true);
    };
    img.onerror = () => {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, this.state.width(), this.state.height());
      ctx.fillStyle = '#9ca3af';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Failed to load image',
        this.state.width() / 2,
        this.state.height() / 2,
      );
      this.state.imageLoaded.set(true);
    };
    img.src = this.state.src();
  }

  protected onMouseDown(event: MouseEvent): void {
    const canvas = this.annotationCanvasRef()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.isDrawing = true;
    this.startPoint = { x, y };

    if (this.state.currentTool() === 'eraser') {
      this.state.eraseAt(x, y);
    } else {
      this.currentAnnotation = {
        id: crypto.randomUUID(),
        tool: this.state.currentTool(),
        points: [{ x, y }],
        color: this.state.currentColor(),
        lineWidth: this.state.lineWidth(),
      };
    }
  }

  protected onMouseMove(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const canvas = this.annotationCanvasRef()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.state.currentTool() === 'eraser') {
      this.state.eraseAt(x, y);
    } else if (this.currentAnnotation) {
      if (this.state.currentTool() === 'pen') {
        this.currentAnnotation.points.push({ x, y });
      } else {
        this.currentAnnotation.points = [this.startPoint!, { x, y }];
      }
      this.redrawAnnotations();
    }
  }

  protected onMouseUp(): void {
    if (!this.isDrawing) return;

    if (this.currentAnnotation && this.state.currentTool() !== 'eraser') {
      this.state.addAnnotation(this.currentAnnotation);
    }

    this.isDrawing = false;
    this.currentAnnotation = null;
    this.startPoint = null;
    this.redrawAnnotations();
  }

  private redrawAnnotations(): void {
    const canvas = this.annotationCanvasRef()?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.state.width(), this.state.height());

    for (const ann of this.state.annotations()) {
      this.drawAnnotation(ctx, ann);
    }

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

  private performDownload(): void {
    const imageCanvas = this.imageCanvasRef()?.nativeElement;
    const annotationCanvas = this.annotationCanvasRef()?.nativeElement;
    if (!imageCanvas || !annotationCanvas) return;

    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = this.state.width();
    combinedCanvas.height = this.state.height();
    const ctx = combinedCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(imageCanvas, 0, 0);
    ctx.drawImage(annotationCanvas, 0, 0);

    const dataUrl = combinedCanvas.toDataURL('image/png');
    this.state.onSave?.(dataUrl);

    const link = document.createElement('a');
    link.download = 'annotated-image.png';
    link.href = dataUrl;
    link.click();
  }
}
