import { DestroyRef, Service, computed, inject, signal } from '@angular/core';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfComment, ScPdfEditorAnnotation } from './pdf-viewer-types';

/**
 * The annotation tools on the pages: what's being drawn, written, moved or
 * resized, and the pointer and keyboard handling that does it. Provided by
 * the canvas, shared by its pages' editor layers.
 */
@Service({ autoProvided: false })
export class ScPdfEditor {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  private readonly editorMode = this.pdfViewer.editorMode;

  /** The ink stroke being drawn, shown as it's drawn. */
  readonly inkStroke = signal<{
    page: number;
    points: { x: number; y: number }[];
  } | null>(null);
  /** A text annotation being written (the text tool's click). */
  readonly textDraft = signal<{
    page: number;
    x: number;
    y: number;
  } | null>(null);
  /** The text annotation being edited (double-click), or null. */
  readonly editingText = signal<string | null>(null);
  /** A move / resize in progress, shown live and committed on release. */
  readonly preview = signal<{
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
  } | null>(null);

  private dragState: {
    annotationId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    layerW: number;
    layerH: number;
  } | null = null;
  private resizeState: {
    annotationId: string;
    handle: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
    layerW: number;
    layerH: number;
  } | null = null;

  /** The annotations of each page. */
  private readonly annotationsByPage = computed(() => {
    const byPage = new Map<number, ScPdfEditorAnnotation[]>();
    for (const annotation of this.pdfViewer.editorAnnotations()) {
      const list = byPage.get(annotation.pageNumber) ?? [];
      list.push(annotation);
      byPage.set(annotation.pageNumber, list);
    }
    return byPage;
  });

  /** The comments of each page, with their position in the list. */
  private readonly commentsByPage = computed(() => {
    const byPage = new Map<
      number,
      { comment: ScPdfComment; index: number }[]
    >();
    this.pdfViewer.comments().forEach((comment, index) => {
      const list = byPage.get(comment.pageNumber) ?? [];
      list.push({ comment, index });
      byPage.set(comment.pageNumber, list);
    });
    return byPage;
  });

  /**
   * The editor layers take the pointer for the text, ink and comment tools;
   * otherwise it passes through to the text layer (selecting, highlighting)
   * — their annotations still take clicks.
   */
  readonly pointerEvents = computed(() => {
    const mode = this.editorMode();
    return mode === 'freetext' || mode === 'ink' || mode === 'comment'
      ? 'auto'
      : 'none';
  });

  readonly cursor = computed(() => {
    const mode = this.editorMode();
    if (mode === 'freetext') return 'text';
    if (mode === 'ink') return 'crosshair';
    if (mode === 'comment') return 'cell';
    return 'default';
  });

  /** The root the pages are in (the canvas's scroll container). */
  private root: HTMLElement | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.listen(null));
  }

  /**
   * Listens on the document — selecting text to highlight, moving and
   * resizing, deselecting, Delete — for the pages under `root`; null stops.
   */
  listen(root: HTMLElement | null): void {
    this.root = root;
    document.removeEventListener('mouseup', this.onHighlightMouseUp);
    document.removeEventListener('pointermove', this.onGlobalPointerMove);
    document.removeEventListener('pointerup', this.onGlobalPointerUp);
    document.removeEventListener('pointerdown', this.onGlobalPointerDown);
    document.removeEventListener('keydown', this.onAnnotationKeyDown);
    if (!root) return;
    document.addEventListener('mouseup', this.onHighlightMouseUp);
    document.addEventListener('pointermove', this.onGlobalPointerMove);
    document.addEventListener('pointerup', this.onGlobalPointerUp);
    document.addEventListener('pointerdown', this.onGlobalPointerDown);
    document.addEventListener('keydown', this.onAnnotationKeyDown);
  }

  annotationsOn(page: number): ScPdfEditorAnnotation[] {
    return this.annotationsByPage().get(page) ?? [];
  }

  commentsOn(page: number): { comment: ScPdfComment; index: number }[] {
    return this.commentsByPage().get(page) ?? [];
  }

  isSelected(annotation: ScPdfEditorAnnotation): boolean {
    return this.pdfViewer.selectedAnnotationId() === annotation.id;
  }

  /** Where an annotation shows — live while it's moved or resized. */
  position(annotation: ScPdfEditorAnnotation): {
    x: number;
    y: number;
    width: number;
  } {
    const preview = this.preview();
    if (preview?.id === annotation.id) {
      return {
        x: preview.x,
        y: preview.y,
        width: preview.width ?? annotation.width ?? 0.15,
      };
    }
    return {
      x: annotation.x ?? 0,
      y: annotation.y ?? 0,
      width: annotation.width ?? 0.15,
    };
  }

  select(event: PointerEvent, annotation: ScPdfEditorAnnotation): void {
    event.stopPropagation();
    this.pdfViewer.selectedAnnotationId.set(annotation.id);
  }

  /** Selects an annotation; on a selected one, starts moving it. */
  onAnnotationPointerDown(
    event: PointerEvent,
    annotation: ScPdfEditorAnnotation,
    layer: HTMLElement,
  ): void {
    event.stopPropagation();
    if (this.editingText() === annotation.id) return;
    // Your toolbar inside it handles its own clicks.
    if ((event.target as HTMLElement).closest('button, input, a')) return;
    event.preventDefault();
    if (!this.isSelected(annotation)) {
      this.pdfViewer.selectedAnnotationId.set(annotation.id);
      return;
    }
    this.dragState = {
      annotationId: annotation.id,
      startX: event.clientX,
      startY: event.clientY,
      origX: annotation.x ?? 0,
      origY: annotation.y ?? 0,
      layerW: layer.offsetWidth,
      layerH: layer.offsetHeight,
    };
  }

  startResize(
    event: PointerEvent,
    annotation: ScPdfEditorAnnotation,
    handle: string,
    layer: HTMLElement,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    this.resizeState = {
      annotationId: annotation.id,
      handle,
      startX: event.clientX,
      startY: event.clientY,
      origX: annotation.x ?? 0,
      origY: annotation.y ?? 0,
      origW: annotation.width ?? 0.15,
      origH: annotation.height ?? 0.15,
      layerW: layer.offsetWidth,
      layerH: layer.offsetHeight,
    };
  }

  /** Double-click a text annotation to edit it in place. */
  editText(event: MouseEvent, annotation: ScPdfEditorAnnotation): void {
    event.preventDefault();
    event.stopPropagation();
    this.pdfViewer.selectedAnnotationId.set(annotation.id);
    this.editingText.set(annotation.id);
  }

  commitText(event: FocusEvent, annotation: ScPdfEditorAnnotation): void {
    if (this.editingText() !== annotation.id) return;
    this.editingText.set(null);
    const text = (event.target as HTMLElement).textContent?.trim() ?? '';
    if (!text) {
      this.pdfViewer.removeEditorAnnotation(annotation.id);
    } else if (text !== annotation.text) {
      this.pdfViewer.updateEditorAnnotation(annotation.id, { text });
    }
  }

  onTextKeydown(event: KeyboardEvent, annotation: ScPdfEditorAnnotation): void {
    if (this.editingText() !== annotation.id) return;
    const element = event.target as HTMLElement;
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.editingText.set(null);
      element.textContent = annotation.text ?? '';
      element.blur();
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      element.blur();
    }
  }

  commitDraft(event: FocusEvent): void {
    const draft = this.textDraft();
    this.textDraft.set(null);
    const text = (event.target as HTMLElement).textContent?.trim() ?? '';
    if (!draft || !text) return;
    this.pdfViewer.addEditorAnnotation({
      type: 'freetext',
      pageNumber: draft.page,
      x: draft.x,
      y: draft.y,
      text,
      fontSize: this.pdfViewer.freetextSize(),
      fontColor: this.pdfViewer.freetextColor(),
    });
  }

  onDraftKeydown(event: KeyboardEvent): void {
    const element = event.target as HTMLElement;
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.textDraft.set(null);
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      element.blur();
    }
  }

  /** The tool's click on a page: place a comment, start a text, draw. */
  onLayerPointerDown(event: PointerEvent, pageNumber: number): void {
    const mode = this.editorMode();
    const layer = event.currentTarget as HTMLElement;
    const { x, y } = this.pointInLayer(layer, event.clientX, event.clientY);

    if (mode === 'comment') {
      event.preventDefault();
      event.stopPropagation();
      this.pdfViewer.startComment(pageNumber, x, y);
    } else if (mode === 'freetext') {
      event.preventDefault();
      event.stopPropagation();
      this.textDraft.set({ page: pageNumber, x, y });
    } else if (mode === 'ink') {
      layer.setPointerCapture(event.pointerId);
      this.inkStroke.set({ page: pageNumber, points: [{ x, y }] });
    }
  }

  onLayerPointerMove(event: PointerEvent): void {
    const stroke = this.inkStroke();
    if (!stroke) return;
    const layer = event.currentTarget as HTMLElement;
    const point = this.pointInLayer(layer, event.clientX, event.clientY);
    this.inkStroke.set({ ...stroke, points: [...stroke.points, point] });
  }

  onLayerPointerUp(event: PointerEvent): void {
    const stroke = this.inkStroke();
    if (!stroke) return;
    this.inkStroke.set(null);
    const layer = event.currentTarget as HTMLElement;
    if (layer.hasPointerCapture(event.pointerId)) {
      layer.releasePointerCapture(event.pointerId);
    }
    if (stroke.points.length < 2) return;
    this.pdfViewer.addEditorAnnotation({
      type: 'ink',
      pageNumber: stroke.page,
      strokes: [stroke.points],
      color: this.pdfViewer.inkColor(),
      strokeWidth: this.pdfViewer.inkThickness(),
      opacity: this.pdfViewer.inkOpacity(),
    });
  }

  /** A screen offset turned back by the pages' rotation. */
  private unrotate(dx: number, dy: number): { dx: number; dy: number } {
    const angle = (-this.pdfViewer.rotation() * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { dx: dx * cos - dy * sin, dy: dx * sin + dy * cos };
  }

  /**
   * A screen point as 0–1 of a page's editor layer — the unrotated page,
   * whatever the rotation (offsetWidth/Height ignore the CSS rotation).
   */
  private pointInLayer(
    layer: HTMLElement,
    clientX: number,
    clientY: number,
  ): { x: number; y: number } {
    const rect = layer.getBoundingClientRect();
    const { dx, dy } = this.unrotate(
      clientX - (rect.left + rect.width / 2),
      clientY - (rect.top + rect.height / 2),
    );
    return {
      x: dx / layer.offsetWidth + 0.5,
      y: dy / layer.offsetHeight + 0.5,
    };
  }

  /** How far the pointer moved since the drag / resize began, in page units. */
  private pointerDelta(
    e: PointerEvent,
    state: { startX: number; startY: number; layerW: number; layerH: number },
  ): { dx: number; dy: number } {
    const { dx, dy } = this.unrotate(
      e.clientX - state.startX,
      e.clientY - state.startY,
    );
    return { dx: dx / state.layerW, dy: dy / state.layerH };
  }

  /** The size and place a resize gives, from the pointer's move. */
  private resized(
    e: PointerEvent,
    state: NonNullable<ScPdfEditor['resizeState']>,
  ): { x: number; y: number; width: number; height: number } {
    const { dx } = this.pointerDelta(e, state);
    const aspect = state.origH / state.origW;
    let width = state.origW;
    let x = state.origX;
    let y = state.origY;
    if (state.handle.includes('e')) {
      width = Math.max(0.02, state.origW + dx);
    } else if (state.handle.includes('w')) {
      width = Math.max(0.02, state.origW - dx);
      x = state.origX + (state.origW - width);
    }
    const height = width * aspect;
    if (state.handle.includes('n')) y = state.origY + (state.origH - height);
    return { x, y, width, height };
  }

  /** The place a move gives, from the pointer's move. */
  private moved(
    e: PointerEvent,
    state: NonNullable<ScPdfEditor['dragState']>,
  ): { x: number; y: number; dx: number; dy: number } {
    const { dx, dy } = this.pointerDelta(e, state);
    return {
      x: Math.max(0, Math.min(1, state.origX + dx)),
      y: Math.max(0, Math.min(1, state.origY + dy)),
      dx,
      dy,
    };
  }

  /** Text selected with the highlight tool becomes a highlight. */
  private readonly onHighlightMouseUp = (): void => {
    if (this.editorMode() !== 'highlight') return;

    const selection = document.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const root = this.root;
    if (!root || !root.contains(range.startContainer)) return;

    // The page the selection starts in.
    const start =
      range.startContainer instanceof Element
        ? range.startContainer
        : range.startContainer.parentElement;
    const pageEl = start
      ?.closest('.textLayer')
      ?.closest<HTMLElement>('[data-page]');
    const pageNumber = parseInt(pageEl?.getAttribute('data-page') ?? '', 10);
    if (!pageEl || !pageNumber) return;

    const layer = pageEl.querySelector<HTMLElement>(
      `[data-editorlayer-page="${pageNumber}"]`,
    );
    if (!layer) return;

    // Each selection rect, mapped corner by corner into the unrotated page.
    const rects: { x: number; y: number; width: number; height: number }[] = [];
    for (const r of Array.from(range.getClientRects())) {
      if (!r.width || !r.height) continue;
      const a = this.pointInLayer(layer, r.left, r.top);
      const b = this.pointInLayer(layer, r.right, r.bottom);
      rects.push({
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(b.x - a.x),
        height: Math.abs(b.y - a.y),
      });
    }
    if (rects.length === 0) return;

    this.pdfViewer.addEditorAnnotation({
      type: 'highlight',
      pageNumber,
      rects,
      color: this.pdfViewer.highlightColor(),
      opacity: 0.4,
    });
    selection.removeAllRanges();
  };

  /** A click away from the annotations deselects. */
  private readonly onGlobalPointerDown = (event: PointerEvent): void => {
    if (!this.pdfViewer.selectedAnnotationId()) return;
    if ((event.target as HTMLElement).closest('[data-annotation]')) return;
    this.pdfViewer.selectedAnnotationId.set(null);
  };

  private readonly onGlobalPointerMove = (e: PointerEvent): void => {
    if (this.dragState) {
      const { x, y } = this.moved(e, this.dragState);
      this.preview.set({ id: this.dragState.annotationId, x, y });
    } else if (this.resizeState) {
      this.preview.set({
        id: this.resizeState.annotationId,
        ...this.resized(e, this.resizeState),
      });
    }
  };

  private readonly onGlobalPointerUp = (e: PointerEvent): void => {
    if (this.dragState) {
      const { x, y, dx, dy } = this.moved(e, this.dragState);
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        this.pdfViewer.updateEditorAnnotation(this.dragState.annotationId, {
          x,
          y,
        });
      }
      this.dragState = null;
    } else if (this.resizeState) {
      this.pdfViewer.updateEditorAnnotation(
        this.resizeState.annotationId,
        this.resized(e, this.resizeState),
      );
      this.resizeState = null;
    }
    this.preview.set(null);
  };

  /** Delete / Backspace deletes the selected annotation; Escape deselects. */
  private readonly onAnnotationKeyDown = (e: KeyboardEvent): void => {
    const id = this.pdfViewer.selectedAnnotationId();
    if (!id) return;
    const target = e.target as HTMLElement | null;
    // Not while typing.
    if (
      target?.isContentEditable ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? '')
    ) {
      return;
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      this.pdfViewer.removeEditorAnnotation(id);
    } else if (e.key === 'Escape') {
      this.pdfViewer.selectedAnnotationId.set(null);
    }
  };
}
