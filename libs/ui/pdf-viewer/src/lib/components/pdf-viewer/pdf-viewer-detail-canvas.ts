import type { PDFPageProxy, PageViewport, RenderTask } from 'pdfjs-dist';
import { MAX_CANVAS_PIXELS } from './pdf-viewer-output-scale';

/**
 * At high zoom a page's canvas is drawn below the screen's density (it would
 * be too big); the detail canvas draws the visible part of it — plus a
 * margin, for scrolling — at full density, as pdf.js's viewer does.
 */

/** A rectangle of the page, in CSS pixels from its top left corner. */
export interface ScPdfVisibleArea {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface ScPdfDetailArea {
  minX: number;
  minY: number;
  width: number;
  height: number;
  scale: number;
}

/** How far scrolling goes, as a share of the margin, before redrawing. */
const MOVEMENT_THRESHOLD = 0.5;

export class ScPdfDetailCanvas {
  private readonly areas = new Map<number, ScPdfDetailArea>();
  private readonly tasks = new Map<number, RenderTask>();

  /** Forgets a page's detail; its canvas is hidden. */
  reset(pageNumber: number, canvas: HTMLCanvasElement | null): void {
    this.tasks.get(pageNumber)?.cancel();
    this.tasks.delete(pageNumber);
    this.areas.delete(pageNumber);
    if (canvas) {
      canvas.hidden = true;
      canvas.width = 0;
      canvas.height = 0;
    }
  }

  /** Forgets every page's detail (a new document). */
  resetAll(): void {
    for (const task of this.tasks.values()) task.cancel();
    this.tasks.clear();
    this.areas.clear();
  }

  /**
   * Draws the visible part of the page into `canvas` — unless the detail
   * drawn already covers it.
   */
  async update(
    page: PDFPageProxy,
    canvas: HTMLCanvasElement,
    visible: ScPdfVisibleArea,
    viewport: PageViewport,
    dpr: number,
    params: object,
  ): Promise<boolean> {
    const pageNumber = page.pageNumber;
    if (!this.needsNewArea(this.areas.get(pageNumber), visible, viewport)) {
      return false;
    }

    // The visible part, grown on each side as far as the canvas limit lets.
    const visibleWidth = visible.maxX - visible.minX;
    const visibleHeight = visible.maxY - visible.minY;
    const visiblePixels = visibleWidth * visibleHeight * dpr * dpr;
    const maxRatio = Math.sqrt(MAX_CANVAS_PIXELS / visiblePixels);
    const overflow = Math.max(0, Math.min(1, (maxRatio - 1) / 2));
    const minX = Math.max(0, visible.minX - visibleWidth * overflow);
    const maxX = Math.min(
      viewport.width,
      visible.maxX + visibleWidth * overflow,
    );
    const minY = Math.max(0, visible.minY - visibleHeight * overflow);
    const maxY = Math.min(
      viewport.height,
      visible.maxY + visibleHeight * overflow,
    );
    const area: ScPdfDetailArea = {
      minX,
      minY,
      width: maxX - minX,
      height: maxY - minY,
      scale: viewport.scale,
    };
    this.tasks.get(pageNumber)?.cancel();
    this.areas.set(pageNumber, area);

    // Full density, unless even the visible part is over the limit.
    const density = Math.min(
      dpr,
      Math.sqrt(MAX_CANVAS_PIXELS / (area.width * area.height)),
    );
    // Drawn off screen, then copied: the previous detail stays meanwhile.
    const buffer = document.createElement('canvas');
    buffer.width = Math.floor(area.width * density);
    buffer.height = Math.floor(area.height * density);
    const task = page.render({
      ...params,
      canvas: buffer,
      viewport,
      transform: [
        density,
        0,
        0,
        density,
        -area.minX * density,
        -area.minY * density,
      ],
    } as Parameters<PDFPageProxy['render']>[0]);
    this.tasks.set(pageNumber, task);
    try {
      await task.promise;
    } catch {
      // Cancelled (scrolled on, zoomed, released).
      if (this.areas.get(pageNumber) === area) this.areas.delete(pageNumber);
      return false;
    } finally {
      if (this.tasks.get(pageNumber) === task) this.tasks.delete(pageNumber);
    }
    if (this.areas.get(pageNumber) !== area) return false;

    canvas.width = buffer.width;
    canvas.height = buffer.height;
    canvas.getContext('2d')?.drawImage(buffer, 0, 0);
    buffer.width = buffer.height = 0;
    const { style } = canvas;
    style.left = `${(area.minX * 100) / viewport.width}%`;
    style.top = `${(area.minY * 100) / viewport.height}%`;
    style.width = `${(area.width * 100) / viewport.width}%`;
    style.height = `${(area.height * 100) / viewport.height}%`;
    canvas.hidden = false;
    return true;
  }

  /** Whether the visible part has left the drawn area, or nearly. */
  private needsNewArea(
    area: ScPdfDetailArea | undefined,
    visible: ScPdfVisibleArea,
    viewport: PageViewport,
  ): boolean {
    if (!area || area.scale !== viewport.scale) return true;
    const maxX = area.minX + area.width;
    const maxY = area.minY + area.height;
    if (
      visible.minX < area.minX ||
      visible.minY < area.minY ||
      visible.maxX > maxX ||
      visible.maxY > maxY
    ) {
      return true;
    }
    // Close to an edge that isn't the page's own: redraw around it.
    const left = visible.minX - area.minX;
    const right = maxX - visible.maxX;
    const top = visible.minY - area.minY;
    const bottom = maxY - visible.maxY;
    const ratio = (1 + MOVEMENT_THRESHOLD) / MOVEMENT_THRESHOLD;
    return (
      (area.minX > 0 && right / left > ratio) ||
      (maxX < viewport.width && left / right > ratio) ||
      (area.minY > 0 && bottom / top > ratio) ||
      (maxY < viewport.height && top / bottom > ratio)
    );
  }
}
