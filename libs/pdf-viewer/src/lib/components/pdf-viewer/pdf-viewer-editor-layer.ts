import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  TemplateRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { ScPdfEditor } from './pdf-viewer-editor';
import type { ScPdfEditorAnnotation } from './pdf-viewer-types';

/**
 * A page's annotations — highlights, ink, text, images, comment markers —
 * and what the annotation tools draw on it. In the unrotated page's
 * coordinates (0–1), turned with the page. Part of the canvas.
 */
@Component({
  selector: 'div[scPdfViewerEditorLayer]',
  imports: [NgTemplateOutlet],
  template: `
    @for (annotation of editor.annotationsOn(page()); track annotation.id) {
      @if (annotation.type === 'highlight') {
        @if (pdfViewer.highlightShowAll()) {
          @for (rect of annotation.rects; track $index) {
            <div
              data-annotation
              class="data-selected:outline-ring pointer-events-auto absolute cursor-pointer rounded-xs mix-blend-multiply outline-offset-1 data-selected:outline-2"
              [attr.data-selected]="editor.isSelected(annotation) || null"
              [style.left.%]="rect.x * 100"
              [style.top.%]="rect.y * 100"
              [style.width.%]="rect.width * 100"
              [style.height.%]="rect.height * 100"
              [style.background-color]="annotation.color"
              [style.opacity]="annotation.opacity ?? 0.4"
              (pointerdown)="editor.select($event, annotation)"
            ></div>
          }
          @if (
            editor.isSelected(annotation) && annotation.rects?.[0];
            as first
          ) {
            <div
              data-annotation
              class="pointer-events-auto absolute z-20 -translate-y-full pb-1.5"
              [style.left.%]="first.x * 100"
              [style.top.%]="first.y * 100"
            >
              <ng-container
                [ngTemplateOutlet]="toolbar()"
                [ngTemplateOutletContext]="{
                  $implicit: annotation,
                }"
              />
            </div>
          }
        }
      } @else if (annotation.type === 'ink') {
        <svg
          class="pointer-events-none absolute inset-0 size-full overflow-visible"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          @for (stroke of annotation.strokes; track $index) {
            <polyline
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
              [attr.points]="points(stroke)"
              [attr.stroke]="annotation.color"
              [attr.stroke-width]="(annotation.strokeWidth ?? 1) * scale()"
              [attr.stroke-opacity]="annotation.opacity ?? 1"
            />
          }
        </svg>
      } @else if (annotation.type === 'freetext') {
        <div
          data-annotation
          tabindex="0"
          class="data-selected:outline-ring pointer-events-auto absolute z-[5] cursor-move outline-offset-2 data-selected:z-10 data-selected:outline-2"
          [attr.data-selected]="editor.isSelected(annotation) || null"
          [style.left.%]="editor.position(annotation).x * 100"
          [style.top.%]="editor.position(annotation).y * 100"
          (pointerdown)="
            editor.onAnnotationPointerDown($event, annotation, host)
          "
          (dblclick)="editor.editText($event, annotation)"
        >
          <div
            data-text
            class="px-1 py-0.5 leading-[1.2] whitespace-pre-wrap select-none data-editing:cursor-text data-editing:outline-none data-editing:select-text"
            [attr.data-editing]="editor.editingText() === annotation.id || null"
            [attr.contenteditable]="
              editor.editingText() === annotation.id ? 'plaintext-only' : null
            "
            [style.font-size.px]="(annotation.fontSize ?? 14) * scale()"
            [style.color]="annotation.fontColor"
            [textContent]="annotation.text"
            (blur)="editor.commitText($event, annotation)"
            (keydown)="editor.onTextKeydown($event, annotation)"
          ></div>
          @if (editor.isSelected(annotation)) {
            <div class="absolute top-full left-0 z-20 mt-1.5">
              <ng-container
                [ngTemplateOutlet]="toolbar()"
                [ngTemplateOutletContext]="{
                  $implicit: annotation,
                }"
              />
            </div>
          }
        </div>
      } @else if (annotation.imageDataUrl) {
        <div
          data-annotation
          tabindex="0"
          class="data-selected:outline-ring pointer-events-auto absolute z-[5] cursor-move outline-offset-2 data-selected:z-10 data-selected:outline-2"
          [attr.data-selected]="editor.isSelected(annotation) || null"
          [attr.role]="imageName(annotation) ? 'img' : null"
          [attr.aria-label]="imageName(annotation)"
          [style.left.%]="editor.position(annotation).x * 100"
          [style.top.%]="editor.position(annotation).y * 100"
          [style.width.%]="editor.position(annotation).width * 100"
          (pointerdown)="
            editor.onAnnotationPointerDown($event, annotation, host)
          "
        >
          <img
            alt=""
            draggable="false"
            class="pointer-events-none block w-full select-none"
            [src]="annotation.imageDataUrl"
          />
          @if (editor.isSelected(annotation)) {
            @for (handle of handles; track handle.corner) {
              <div
                class="bg-ring absolute z-[11] size-2.5 rounded-xs border border-white"
                [class]="handle.class"
                (pointerdown)="
                  editor.startResize($event, annotation, handle.corner, host)
                "
              ></div>
            }
            <div class="absolute top-full left-0 z-20 mt-1.5">
              <ng-container
                [ngTemplateOutlet]="toolbar()"
                [ngTemplateOutletContext]="{
                  $implicit: annotation,
                }"
              />
            </div>
          }
        </div>
      }
    }

    <!-- The ink stroke being drawn. -->
    @if (editor.inkStroke(); as stroke) {
      @if (stroke.page === page()) {
        <svg
          class="pointer-events-none absolute inset-0 size-full overflow-visible"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
            [attr.points]="points(stroke.points)"
            [attr.stroke]="pdfViewer.inkColor()"
            [attr.stroke-width]="pdfViewer.inkThickness() * scale()"
            [attr.stroke-opacity]="pdfViewer.inkOpacity()"
          />
        </svg>
      }
    }

    <!-- The text annotation being written (the text tool). -->
    @if (editor.textDraft(); as draft) {
      @if (draft.page === page()) {
        <div
          data-annotation
          data-text-draft
          contenteditable="plaintext-only"
          class="outline-ring bg-background/80 pointer-events-auto absolute z-10 min-h-[1em] min-w-5 px-1 py-0.5 leading-[1.2] whitespace-pre-wrap outline-2"
          [style.left.%]="draft.x * 100"
          [style.top.%]="draft.y * 100"
          [style.font-size.px]="pdfViewer.freetextSize() * scale()"
          [style.color]="pdfViewer.freetextColor()"
          (pointerdown)="$event.stopPropagation()"
          (blur)="editor.commitDraft($event)"
          (keydown)="editor.onDraftKeydown($event)"
        ></div>
      }
    }

    <!-- Comment markers (yours). -->
    @for (entry of editor.commentsOn(page()); track entry.comment.id) {
      <div
        data-annotation
        class="pointer-events-auto absolute z-[6] -translate-x-1/2 -translate-y-1/2"
        [style.left.%]="entry.comment.x * 100"
        [style.top.%]="entry.comment.y * 100"
        (pointerdown)="$event.stopPropagation()"
      >
        <ng-container
          [ngTemplateOutlet]="marker()"
          [ngTemplateOutletContext]="{
            $implicit: entry.comment,
            index: entry.index,
            active: entry.comment.id === pdfViewer.activeCommentId(),
            pending: false,
          }"
        />
      </div>
    }
    @if (pdfViewer.pendingComment(); as pending) {
      @if (pending.pageNumber === page()) {
        <div
          data-annotation
          class="pointer-events-auto absolute z-[6] -translate-x-1/2 -translate-y-1/2"
          [style.left.%]="pending.x * 100"
          [style.top.%]="pending.y * 100"
          (pointerdown)="$event.stopPropagation()"
        >
          <ng-container
            [ngTemplateOutlet]="marker()"
            [ngTemplateOutletContext]="{
              $implicit: null,
              index: pdfViewer.comments().length,
              active: true,
              pending: true,
            }"
          />
        </div>
      }
    }
  `,
  host: {
    '[class]': 'class()',
    '[style.transform]':
      "'translate(-50%, -50%) rotate(' + pdfViewer.rotation() + 'deg)'",
    '[style.pointer-events]': 'editor.pointerEvents()',
    '[style.cursor]': 'editor.cursor()',
    '[attr.data-editorlayer-page]': 'page()',
    '(pointerdown)': 'editor.onLayerPointerDown($event, page())',
    '(pointermove)': 'editor.onLayerPointerMove($event)',
    '(pointerup)': 'editor.onLayerPointerUp($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEditorLayer {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  protected readonly editor = inject(ScPdfEditor);
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly page = input.required<number>({ alias: 'scPdfViewerEditorLayer' });
  /** The scale the page is drawn at (stroke widths, font sizes). */
  readonly scale = input(1);
  /** Your toolbar for the selected annotation, and your comment markers. */
  readonly toolbar = input<TemplateRef<unknown> | null>(null);
  readonly marker = input<TemplateRef<unknown> | null>(null);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('editorLayer absolute top-1/2 left-1/2 z-[5]', this.classInput()),
  );

  /** The resize handles of a selected image. */
  protected readonly handles = [
    { corner: 'nw', class: '-top-1.5 -left-1.5 cursor-nwse-resize' },
    { corner: 'ne', class: '-top-1.5 -right-1.5 cursor-nesw-resize' },
    { corner: 'sw', class: '-bottom-1.5 -left-1.5 cursor-nesw-resize' },
    { corner: 'se', class: '-right-1.5 -bottom-1.5 cursor-nwse-resize' },
  ];

  constructor() {
    // Focus the text being written or edited on this page, all of it
    // selected when editing.
    afterRenderEffect(() => {
      const editing = this.editor.editingText();
      const drafting = this.editor.textDraft();
      if (!editing && !drafting) return;
      const element = this.host.querySelector<HTMLElement>(
        drafting ? '[data-text-draft]' : '[data-editing]',
      );
      if (!element || document.activeElement === element) return;
      element.focus();
      if (editing) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = document.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    });
  }

  /** An image annotation's name: its alt text or description, if any. */
  protected imageName(annotation: ScPdfEditorAnnotation): string | null {
    if (annotation.isDecorative) return null;
    return annotation.altText || annotation.description || null;
  }

  /** Points of a stroke for an SVG polyline (0–1 of the page). */
  protected points(stroke: { x: number; y: number }[]): string {
    return stroke.map((p) => `${p.x},${p.y}`).join(' ');
  }
}
