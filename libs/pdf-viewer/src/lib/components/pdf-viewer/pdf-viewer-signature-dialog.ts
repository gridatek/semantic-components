import {
  Component,
  DOCUMENT,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScDialog,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScField,
  ScInput,
  ScLabel,
  ScSlider,
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

type SignatureTab = 'type' | 'draw' | 'image';

/** Signatures are drawn and typed in black, like ink on paper. */
const INK = '#000000';
const SIGNATURE_FONT = '"Brush Script MT", "Segoe Script", cursive, serif';

/**
 * Creates a signature — typed, drawn or from an image — and places it on the
 * current page. Closing it (Cancel, Escape, clicking outside) adds nothing.
 */
@Component({
  selector: 'sc-pdf-viewer-signature-dialog',
  imports: [
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogFooter,
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanel,
    ScTabContent,
    ScField,
    ScLabel,
    ScInput,
    ScSlider,
    ScCheckbox,
    ScCheckboxField,
    ScButton,
  ],
  template: `
    <div
      scDialogProvider
      [open]="pdfViewer.signatureDialogOpen()"
      (openChange)="onOpenChange($event)"
    >
      <ng-template scDialogPortal>
        <div scDialog class="sm:w-xl sm:max-w-xl">
          <div scDialogHeader>
            <h2 scDialogTitle>Add a signature</h2>
          </div>

          <div scTabs>
            <div
              scTabList
              selectionMode="follow"
              aria-label="Signature type"
              [selectedTab]="activeTab()"
              (selectedTabChange)="activeTab.set($any($event))"
            >
              <button scTab value="type">Type</button>
              <button scTab value="draw">Draw</button>
              <button scTab value="image">Image</button>
            </div>

            <div scTabPanel value="type">
              <ng-template scTabContent>
                <input
                  scInput
                  class="h-36 bg-white text-center text-4xl text-black italic md:text-4xl dark:bg-white"
                  [style.font-family]="signatureFont"
                  aria-label="Signature"
                  placeholder="Your name"
                  [value]="typedText()"
                  (input)="typedText.set($any($event.target).value)"
                />
              </ng-template>
            </div>

            <div scTabPanel value="draw">
              <ng-template scTabContent>
                <div class="grid gap-3">
                  <div
                    class="relative h-36 overflow-hidden rounded-lg border bg-white"
                  >
                    @if (!hasDrawn()) {
                      <span
                        class="pointer-events-none absolute inset-0 grid place-items-center text-sm text-neutral-500"
                      >
                        Draw your signature here
                      </span>
                    }
                    <canvas
                      #drawCanvas
                      class="absolute inset-0 size-full cursor-crosshair touch-none"
                      aria-label="Signature drawing area"
                      (pointerdown)="onDrawStart($event)"
                      (pointermove)="onDrawMove($event)"
                      (pointerup)="onDrawEnd($event)"
                      (pointercancel)="onDrawEnd($event)"
                    ></canvas>
                  </div>
                  <div scField>
                    <label scLabel>Thickness — {{ drawThickness() }}</label>
                    <input
                      scSlider
                      type="range"
                      [min]="1"
                      [max]="6"
                      [value]="drawThickness()"
                      (input)="drawThickness.set(+$any($event.target).value)"
                    />
                  </div>
                </div>
              </ng-template>
            </div>

            <div scTabPanel value="image">
              <ng-template scTabContent>
                <div
                  class="flex h-36 flex-col items-center justify-center gap-2 rounded-lg border bg-white"
                >
                  @if (imagePreview(); as preview) {
                    <img
                      [src]="preview"
                      alt="Signature preview"
                      class="max-h-32 max-w-full object-contain"
                    />
                  } @else {
                    <button
                      scButton
                      variant="outline"
                      (click)="fileInput.click()"
                    >
                      Choose an image…
                    </button>
                  }
                  <input
                    #fileInput
                    type="file"
                    accept="image/*"
                    class="hidden"
                    (change)="onImageSelected($event)"
                  />
                </div>
              </ng-template>
            </div>
          </div>

          <div scField>
            <label scLabel>Description</label>
            <input
              scInput
              placeholder="e.g. My signature"
              [value]="description()"
              (input)="description.set($any($event.target).value)"
            />
          </div>

          <label scCheckboxField>
            <input
              type="checkbox"
              scCheckbox
              [checked]="saveForReuse()"
              (checkedChange)="saveForReuse.set($event)"
            />
            Save signature for later
          </label>

          <div scDialogFooter class="sm:justify-between">
            <button scButton variant="ghost" (click)="clear()">Clear</button>
            <div class="flex gap-2">
              <button scButton variant="outline" (click)="close()">
                Cancel
              </button>
              <button scButton [disabled]="!canAdd()" (click)="addSignature()">
                Add
              </button>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-signature-dialog',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerSignatureDialog {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('contents', this.classInput()));

  private readonly drawCanvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('drawCanvas');

  protected readonly signatureFont = SIGNATURE_FONT;

  readonly activeTab = signal<SignatureTab>('type');
  readonly typedText = signal('');
  readonly description = signal('');
  readonly drawThickness = signal(2);
  readonly hasDrawn = signal(false);
  readonly imagePreview = signal<string | null>(null);
  readonly saveForReuse = signal(true);

  private drawing = false;
  private drawPaths: { points: { x: number; y: number }[]; width: number }[] =
    [];
  private currentPath: { x: number; y: number }[] = [];

  readonly canAdd = computed(() => {
    const tab = this.activeTab();
    if (tab === 'type') return this.typedText().trim().length > 0;
    if (tab === 'draw') return this.hasDrawn();
    return !!this.imagePreview();
  });

  constructor() {
    // The draw panel is recreated when you come back to it: size the new
    // canvas and redraw what was drawn.
    effect(() => {
      const canvas = this.drawCanvasRef()?.nativeElement;
      if (!canvas) return;
      requestAnimationFrame(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.redrawCanvas();
      });
    });
  }

  protected onDrawStart(event: PointerEvent): void {
    const canvas = this.drawCanvasRef()?.nativeElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    this.drawing = true;
    canvas.setPointerCapture(event.pointerId);
    const point = this.pointIn(canvas, event);
    this.currentPath = [point];

    this.applyInk(context, this.drawThickness());
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  protected onDrawMove(event: PointerEvent): void {
    if (!this.drawing) return;
    const canvas = this.drawCanvasRef()?.nativeElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const point = this.pointIn(canvas, event);
    this.currentPath.push(point);
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  protected onDrawEnd(event: PointerEvent): void {
    if (!this.drawing) return;
    this.drawing = false;
    this.drawCanvasRef()?.nativeElement.releasePointerCapture(event.pointerId);

    if (this.currentPath.length > 1) {
      this.drawPaths.push({
        points: [...this.currentPath],
        width: this.drawThickness(),
      });
      this.hasDrawn.set(true);
    }
    this.currentPath = [];
  }

  protected onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
    input.value = '';
  }

  protected clear(): void {
    const tab = this.activeTab();
    if (tab === 'type') {
      this.typedText.set('');
    } else if (tab === 'draw') {
      this.drawPaths = [];
      this.currentPath = [];
      this.hasDrawn.set(false);
      this.redrawCanvas();
    } else {
      this.imagePreview.set(null);
    }
  }

  protected close(): void {
    this.pdfViewer.closeSignatureDialog();
    this.pdfViewer.editorMode.set('none');
    this.resetAll();
  }

  protected addSignature(): void {
    const tab = this.activeTab();
    const dataUrl =
      tab === 'type'
        ? this.renderTypedSignature()
        : tab === 'draw'
          ? (this.drawCanvasRef()?.nativeElement.toDataURL('image/png') ?? '')
          : (this.imagePreview() ?? '');
    if (!dataUrl) return;

    const description = this.description();
    if (this.saveForReuse()) {
      this.pdfViewer.addSavedSignature({
        dataUrl,
        description,
        width: 200,
        height: 80,
      });
    }
    this.pdfViewer.placeSignature(dataUrl, description);

    this.close();
  }

  /** Dismissed with Escape or a click outside. */
  protected onOpenChange(open: boolean): void {
    if (!open && this.pdfViewer.signatureDialogOpen()) this.close();
  }

  private pointIn(
    canvas: HTMLCanvasElement,
    event: PointerEvent,
  ): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  private applyInk(context: CanvasRenderingContext2D, width: number): void {
    context.strokeStyle = INK;
    context.lineWidth = width;
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }

  private renderTypedSignature(): string {
    const canvas = this.document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 120;
    const context = canvas.getContext('2d');
    if (!context) return '';

    context.fillStyle = INK;
    context.font = `italic 44px ${SIGNATURE_FONT}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(this.typedText(), canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL('image/png');
  }

  private redrawCanvas(): void {
    const canvas = this.drawCanvasRef()?.nativeElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const path of this.drawPaths) {
      if (path.points.length < 2) continue;
      this.applyInk(context, path.width);
      context.beginPath();
      context.moveTo(path.points[0].x, path.points[0].y);
      for (const point of path.points.slice(1)) {
        context.lineTo(point.x, point.y);
      }
      context.stroke();
    }
  }

  private resetAll(): void {
    this.typedText.set('');
    this.description.set('');
    this.drawPaths = [];
    this.currentPath = [];
    this.hasDrawn.set(false);
    this.imagePreview.set(null);
    this.activeTab.set('type');
  }
}
