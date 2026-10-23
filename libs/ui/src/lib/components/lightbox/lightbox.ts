import { DOCUMENT } from '@angular/common';
import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * An item: the full image (the trigger's `href`), its alt and thumbnail.
 * Your data for it is yours, at its index.
 */
export interface ScLightboxItem {
  readonly src: string;
  readonly alt: string;
  readonly thumbnail: string;
  /** The trigger: where it opens from, and focus goes back to. */
  readonly element: HTMLElement;
}

const ZOOM_MAX = 4;
/** The name the thumbnail and the image share, morphing one into the other. */
const MORPH = 'sc-lightbox-morph';

/**
 * A lightbox: your gallery of links (`scLightboxTrigger`) to full
 * images, opened in your native `dialog` (`scLightboxDialog`) — the
 * thumbnail morphing into the image. Zoom, pan, swipe, the keys.
 */
@Directive({
  selector: '[scLightbox]',
  exportAs: 'scLightbox',
  host: {
    'data-slot': 'lightbox',
    '[attr.data-morphing]': 'morphing() || null',
    '[class]': 'class()',
  },
})
export class ScLightbox {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly open = model(false);
  /** The item shown: its place among the triggers. */
  readonly index = model(0);
  /** Past the last, the first — and back. */
  readonly loop = input(true, { transform: booleanAttribute });

  /** The items, in the triggers' order. */
  readonly items = signal<readonly ScLightboxItem[]>([]);
  readonly current = computed<ScLightboxItem | undefined>(
    () => this.items()[this.index()],
  );
  readonly hasPrevious = computed(() => this.loop() || this.index() > 0);
  readonly hasNext = computed(
    () => this.loop() || this.index() < this.items().length - 1,
  );

  /** The image's zoom (1–4) and pan, in pixels. */
  readonly zoom = signal(1);
  readonly pan = signal({ x: 0, y: 0 });
  /** The current image, loading. */
  readonly loading = signal(false);
  /** The thumbnail and the image morphing, one into the other: wait for it to settle. */
  readonly morphing = signal(false);

  readonly ɵdialog = signal<HTMLDialogElement | null>(null);
  readonly ɵimage = signal<HTMLImageElement | null>(null);

  protected readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    // Open and closed: the dialog follows.
    effect(() => {
      const open = this.open();
      const dialog = this.ɵdialog();
      if (!dialog || open === dialog.open) return;
      untracked(() =>
        open ? this.showDialog(dialog) : this.hideDialog(dialog),
      );
    });
    // A new image: from its start, unzoomed; its neighbours fetched.
    effect(() => {
      this.index();
      const items = this.items();
      untracked(() => {
        this.resetZoom();
        if (this.open()) this.preload(items);
      });
    });
  }

  /** Opens the lightbox on the item at `index`. */
  show(index: number): void {
    this.index.set(index);
    this.open.set(true);
  }

  close(): void {
    this.open.set(false);
  }

  previous(): void {
    const count = this.items().length;
    if (!count || !this.hasPrevious()) return;
    this.goTo((this.index() - 1 + count) % count);
  }

  next(): void {
    const count = this.items().length;
    if (!count || !this.hasNext()) return;
    this.goTo((this.index() + 1) % count);
  }

  goTo(index: number): void {
    const count = this.items().length;
    if (index < 0 || index >= count || index === this.index()) return;
    this.loading.set(true);
    this.index.set(index);
  }

  /**
   * Zooms to `zoom` (1–4), keeping the point `at` (from the image's centre,
   * in pixels) where it is.
   */
  zoomTo(zoom: number, at = { x: 0, y: 0 }): void {
    const from = this.zoom();
    const to = Math.min(ZOOM_MAX, Math.max(1, zoom));
    const { x, y } = this.pan();
    this.zoom.set(to);
    this.panTo({
      x: at.x - (at.x - x) * (to / from),
      y: at.y - (at.y - y) * (to / from),
    });
  }

  zoomBy(factor: number, at?: { x: number; y: number }): void {
    this.zoomTo(this.zoom() * factor, at);
  }

  resetZoom(): void {
    this.zoom.set(1);
    this.pan.set({ x: 0, y: 0 });
  }

  /** Pans the zoomed image, kept over its frame. */
  panTo({ x, y }: { x: number; y: number }): void {
    const image = this.ɵimage();
    const zoom = this.zoom();
    if (!image || zoom === 1) {
      this.pan.set({ x: 0, y: 0 });
      return;
    }
    const maxX = (image.offsetWidth * (zoom - 1)) / 2;
    const maxY = (image.offsetHeight * (zoom - 1)) / 2;
    this.pan.set({
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    });
  }

  /** The keys, in the dialog. */
  ɵonKeydown(event: KeyboardEvent): void {
    // Fields and buttons keep theirs.
    if ((event.target as HTMLElement).closest('input, textarea, select'))
      return;
    const actions: Record<string, () => void> = {
      ArrowLeft: () => this.previous(),
      ArrowRight: () => this.next(),
      Home: () => this.goTo(0),
      End: () => this.goTo(this.items().length - 1),
      '+': () => this.zoomBy(1.5),
      '=': () => this.zoomBy(1.5),
      '-': () => this.zoomBy(1 / 1.5),
      '0': () => this.resetZoom(),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  ɵregister(item: ScLightboxItem): () => void {
    this.items.update((items) =>
      [...items, item].sort((a, b) =>
        a.element.compareDocumentPosition(b.element) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      ),
    );
    return () =>
      this.items.update((items) => items.filter((each) => each !== item));
  }

  /** The thumbnail morphs into the image (where the browser can, and motion is welcome). */
  private showDialog(dialog: HTMLDialogElement): void {
    const thumbnail = this.thumbnail();
    const image = this.ɵimage();
    const item = this.current();
    const reveal = () => {
      if (image && item) image.src = item.src;
      dialog.showModal();
      this.preload(this.items());
    };
    const transition = this.canMorph() && thumbnail && image;
    if (!transition) {
      reveal();
      return;
    }
    thumbnail.style.viewTransitionName = MORPH;
    this.morphing.set(true);
    void this.document
      .startViewTransition(async () => {
        thumbnail.style.viewTransitionName = '';
        image.style.viewTransitionName = MORPH;
        reveal();
        await image.decode().catch(() => undefined);
      })
      .finished.finally(() => {
        image.style.viewTransitionName = '';
        this.morphing.set(false);
      });
  }

  /** And back into its thumbnail — focus too. */
  private hideDialog(dialog: HTMLDialogElement): void {
    const thumbnail = this.thumbnail();
    const image = this.ɵimage();
    const restore = () => {
      // The dialog gives focus back to the one opened, at once; then to the
      // item shown, which may be another.
      dialog.close();
      this.current()?.element.focus();
      this.resetZoom();
    };
    if (!this.canMorph() || !thumbnail || !image || this.zoom() !== 1) {
      restore();
      return;
    }
    image.style.viewTransitionName = MORPH;
    this.morphing.set(true);
    void this.document
      .startViewTransition(() => {
        image.style.viewTransitionName = '';
        thumbnail.style.viewTransitionName = MORPH;
        restore();
      })
      .finished.finally(() => {
        thumbnail.style.viewTransitionName = '';
        this.morphing.set(false);
      });
  }

  /** The current item's thumbnail image. */
  private thumbnail(): HTMLElement | null {
    const element = this.current()?.element;
    return element?.querySelector('img') ?? element ?? null;
  }

  private canMorph(): boolean {
    const view = this.document.defaultView;
    return (
      typeof this.document.startViewTransition === 'function' &&
      !view?.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /** The neighbours, fetched before they are asked for. */
  private preload(items: readonly ScLightboxItem[]): void {
    const count = items.length;
    if (count < 2) return;
    for (const step of [-1, 1]) {
      const item = items[(this.index() + step + count) % count];
      if (item) new Image().src = item.src;
    }
  }
}
