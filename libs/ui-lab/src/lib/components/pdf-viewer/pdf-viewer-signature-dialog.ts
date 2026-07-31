import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

type SignatureTab = 'type' | 'draw' | 'image';

@Component({
  selector: 'sc-pdf-viewer-signature-dialog',
  template: `
    @if (pdfViewer.signatureDialogOpen()) {
      <div
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
        (click)="close()"
      >
        <dialog
          open
          class="relative w-[570px] max-w-[95vw] rounded border border-[#333] bg-[#474747] p-0 text-[#d1d5db] shadow-lg"
          (click)="$event.stopPropagation()"
        >
          <h2 class="px-4 pt-4 text-base font-semibold text-white">
            Add Signature
          </h2>

          <!-- Tabs -->
          <div class="mt-3 flex border-b border-[#555]" role="tablist">
            <button
              type="button"
              role="tab"
              class="sig-tab"
              [attr.aria-selected]="activeTab() === 'type'"
              [class.sig-tab-active]="activeTab() === 'type'"
              (click)="activeTab.set('type')"
            >
              Type
            </button>
            <button
              type="button"
              role="tab"
              class="sig-tab"
              [attr.aria-selected]="activeTab() === 'draw'"
              [class.sig-tab-active]="activeTab() === 'draw'"
              (click)="activeTab.set('draw')"
            >
              Draw
            </button>
            <button
              type="button"
              role="tab"
              class="sig-tab"
              [attr.aria-selected]="activeTab() === 'image'"
              [class.sig-tab-active]="activeTab() === 'image'"
              (click)="activeTab.set('image')"
            >
              Image
            </button>
          </div>

          <!-- Tab panels -->
          <div class="px-4 py-3">
            @switch (activeTab()) {
              @case ('type') {
                <div
                  role="tabpanel"
                  class="relative flex h-[200px] items-center justify-center rounded bg-[#3d3d3d]"
                >
                  <input
                    type="text"
                    class="absolute inset-0 size-full border-0 bg-transparent text-center text-[44px] text-white italic outline-none"
                    style="font-family: 'Brush Script MT', 'Segoe Script', cursive, serif"
                    placeholder="Type your signature"
                    [value]="typedText()"
                    (input)="typedText.set($any($event.target).value)"
                  />
                </div>
              }
              @case ('draw') {
                <div
                  role="tabpanel"
                  class="relative h-[200px] rounded bg-[#3d3d3d]"
                >
                  @if (!hasDrawn()) {
                    <span
                      class="absolute inset-0 grid place-items-center text-sm text-[#999]"
                    >
                      Draw your signature here
                    </span>
                  }
                  <canvas
                    #drawCanvas
                    class="absolute inset-0 size-full cursor-crosshair rounded"
                    (pointerdown)="onDrawStart($event)"
                    (pointermove)="onDrawMove($event)"
                    (pointerup)="onDrawEnd($event)"
                  ></canvas>
                  <div
                    class="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 rounded-b bg-[#474747] px-2 py-1"
                  >
                    <label class="text-xs text-[#bbb]">Thickness</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      [value]="drawThickness()"
                      (input)="drawThickness.set(+$any($event.target).value)"
                      class="w-24"
                    />
                  </div>
                </div>
              }
              @case ('image') {
                <div
                  role="tabpanel"
                  class="relative flex h-[200px] flex-col items-center justify-center gap-2 rounded bg-[#3d3d3d]"
                >
                  @if (imagePreview()) {
                    <img
                      [src]="imagePreview()"
                      alt="Signature preview"
                      class="max-h-[180px] max-w-full object-contain"
                    />
                  } @else {
                    <span class="text-sm text-[#999]">No image selected</span>
                    <button
                      type="button"
                      class="rounded bg-[#6b9edd] px-3 py-1 text-sm text-white hover:bg-[#5a8ecc]"
                      (click)="fileInput.click()"
                    >
                      Browse...
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
              }
            }

            <!-- Description -->
            <div class="mt-3">
              <label class="mb-1 block text-xs text-[#bbb]">Description</label>
              <input
                type="text"
                class="w-full rounded border border-[#5a5a5a] bg-[#3d3d3d] px-2 py-1.5 text-sm text-[#d1d5db] outline-none focus:border-[#6b9edd]"
                placeholder="Describe your signature"
                [value]="description()"
                (input)="description.set($any($event.target).value)"
              />
            </div>

            <!-- Actions -->
            <div class="mt-4 flex items-center justify-between">
              <button
                type="button"
                class="rounded border border-[#666] bg-[#5a5a5a] px-3 py-1.5 text-sm text-[#d1d5db] hover:bg-[#666] hover:text-white"
                (click)="clear()"
              >
                Clear
              </button>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="rounded border border-[#666] bg-[#5a5a5a] px-4 py-1.5 text-sm text-[#d1d5db] hover:bg-[#666] hover:text-white"
                  (click)="close()"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="rounded bg-[#6b9edd] px-4 py-1.5 text-sm text-white hover:bg-[#5a8ecc] disabled:opacity-50"
                  [disabled]="!canAdd()"
                  (click)="addSignature()"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    }
  `,
  styles: `
    .sig-tab {
      flex: 1;
      padding: 8px 4px;
      font-size: 13px;
      color: #999;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      border-top: 1px solid transparent;
      cursor: pointer;

      &:hover {
        color: #ccc;
        border-top-color: #8f8f9d;
      }
    }

    .sig-tab-active {
      color: #6b9edd !important;
      font-weight: 590;
      border-top-color: #6b9edd !important;
      border-top-width: 2px;
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerSignatureDialog {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly drawCanvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('drawCanvas');

  readonly activeTab = signal<SignatureTab>('type');
  readonly typedText = signal('');
  readonly description = signal('');
  readonly drawThickness = signal(2);
  readonly hasDrawn = signal(false);
  readonly imagePreview = signal<string | null>(null);

  private drawing = false;
  private drawPaths: { x: number; y: number }[][] = [];
  private currentPath: { x: number; y: number }[] = [];

  readonly canAdd = computed(() => {
    const tab = this.activeTab();
    if (tab === 'type') return this.typedText().trim().length > 0;
    if (tab === 'draw') return this.hasDrawn();
    if (tab === 'image') return !!this.imagePreview();
    return false;
  });

  onDrawStart(event: PointerEvent): void {
    const canvas = this.drawCanvasRef()?.nativeElement;
    if (!canvas) return;

    this.drawing = true;
    canvas.setPointerCapture(event.pointerId);

    // Initialize canvas size on first draw
    if (canvas.width !== canvas.clientWidth) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      this.redrawCanvas();
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.currentPath = [{ x, y }];

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = this.drawThickness();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }

  onDrawMove(event: PointerEvent): void {
    if (!this.drawing) return;
    const canvas = this.drawCanvasRef()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.currentPath.push({ x, y });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  onDrawEnd(event: PointerEvent): void {
    if (!this.drawing) return;
    this.drawing = false;

    const canvas = this.drawCanvasRef()?.nativeElement;
    if (canvas) {
      canvas.releasePointerCapture(event.pointerId);
    }

    if (this.currentPath.length > 1) {
      this.drawPaths.push([...this.currentPath]);
      this.hasDrawn.set(true);
    }
    this.currentPath = [];
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  clear(): void {
    const tab = this.activeTab();
    if (tab === 'type') {
      this.typedText.set('');
    } else if (tab === 'draw') {
      this.drawPaths = [];
      this.currentPath = [];
      this.hasDrawn.set(false);
      const canvas = this.drawCanvasRef()?.nativeElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    } else if (tab === 'image') {
      this.imagePreview.set(null);
    }
  }

  close(): void {
    this.pdfViewer.closeSignatureDialog();
    this.pdfViewer.editorMode.set('none');
    this.resetAll();
  }

  addSignature(): void {
    const tab = this.activeTab();
    let dataUrl = '';

    if (tab === 'type') {
      dataUrl = this.renderTypedSignature();
    } else if (tab === 'draw') {
      const canvas = this.drawCanvasRef()?.nativeElement;
      if (canvas) {
        dataUrl = canvas.toDataURL('image/png');
      }
    } else if (tab === 'image') {
      dataUrl = this.imagePreview() || '';
    }

    if (!dataUrl) return;

    const desc = this.description();

    // Save the signature for reuse
    this.pdfViewer.addSavedSignature({
      dataUrl,
      description: desc,
      width: 200,
      height: 80,
    });

    // Switch to stamp-like mode to place the signature
    this.pdfViewer.closeSignatureDialog();
    this.pdfViewer.editorMode.set('stamp');

    // Auto-add as a stamp annotation on page 1 for now
    this.pdfViewer.addEditorAnnotation({
      type: 'signature',
      pageNumber: this.pdfViewer.currentPage(),
      x: 0.3,
      y: 0.8,
      imageDataUrl: dataUrl,
      width: 0.25,
      height: 0.1,
      description: desc,
    });

    this.pdfViewer.editorMode.set('none');
    this.resetAll();
  }

  private renderTypedSignature(): string {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = 'italic 44px "Brush Script MT", "Segoe Script", cursive, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.typedText(), canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL('image/png');
  }

  private redrawCanvas(): void {
    const canvas = this.drawCanvasRef()?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = this.drawThickness();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const path of this.drawPaths) {
      if (path.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
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
