import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  type ScPlacementBox,
  type ScPlacementSide,
  spotlightPlacement,
} from '../../utilities/spotlight-placement';
import { cn } from '../../utils/cn/cn';

/**
 * One element in the spotlight: the page dimmed but for it, your content in
 * a card beside it — a native dialog, named by its title. Modal (the page
 * inert); or `interactive`: the element stays usable through the cutout.
 * Escape, or a click on the dim, closes.
 */
@Component({
  selector: '[scSpotlight]',
  exportAs: 'scSpotlight',
  template: `
    <dialog
      #dialog
      data-slot="spotlight-dialog"
      [class]="dialogClass()"
      [attr.aria-labelledby]="titleId()"
      [attr.aria-describedby]="descriptionId()"
      (cancel)="onCancel($event)"
      (click)="onDialogClick($event)"
    >
      <div
        data-slot="spotlight-dim"
        aria-hidden="true"
        [class]="dimClass()"
        [style.top.px]="lit().top"
        [style.left.px]="lit().left"
        [style.width.px]="lit().width"
        [style.height.px]="lit().height"
      ></div>
      @if (interactive()) {
        <!-- Around the cutout: clicks on the dim close; the cutout lets them through. -->
        @for (strip of strips(); track $index) {
          <div
            class="pointer-events-auto fixed"
            aria-hidden="true"
            [style.top.px]="strip.top"
            [style.left.px]="strip.left"
            [style.width.px]="strip.width"
            [style.height.px]="strip.height"
            (click)="close()"
          ></div>
        }
      }
      <div
        #card
        data-slot="spotlight-card"
        tabindex="-1"
        [attr.data-side]="placed()"
        [class]="cardClass()"
        [style.top.px]="cardAt().top"
        [style.left.px]="cardAt().left"
      >
        <ng-content />
      </div>
    </dialog>
  `,
  host: {
    'data-slot': 'spotlight',
    '[attr.data-open]': 'open() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSpotlight {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly cardClassInput = input<string>('', { alias: 'cardClass' });
  /** The dim's colour and the cutout's look: classes. */
  readonly dimClassInput = input<string>('', { alias: 'dimClass' });

  readonly open = model(false);
  /** The element in the spotlight; none, the card is centred. */
  readonly for = input<Element | null>(null);
  /** Where the card goes; it flips when there is no room. */
  readonly side = input<ScPlacementSide>('bottom');
  /** The room around the element, in pixels. */
  readonly padding = input(8);
  /** The element stays usable through the cutout; the page is not inert. */
  readonly interactive = input(false, { transform: booleanAttribute });

  readonly ɵtitleId = signal<string | null>(null);
  readonly ɵdescriptionId = signal<string | null>(null);
  protected readonly titleId = this.ɵtitleId.asReadonly();
  protected readonly descriptionId = this.ɵdescriptionId.asReadonly();

  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly cardElement =
    viewChild.required<ElementRef<HTMLElement>>('card');

  protected readonly lit = signal<ScPlacementBox>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  protected readonly cardAt = signal({ top: 0, left: 0 });
  protected readonly placed = signal<ScPlacementSide | 'center'>('center');
  private readonly viewport = signal({ width: 0, height: 0 });

  /** Placed once since opening: from then on, its moves are animated. */
  protected readonly settled = signal(false);

  /** The dim around the cutout, in four strips: above, below, either side. */
  protected readonly strips = computed(() => {
    const { top, left, width, height } = this.lit();
    const view = this.viewport();
    return [
      { top: 0, left: 0, width: view.width, height: Math.max(0, top) },
      {
        top: top + height,
        left: 0,
        width: view.width,
        height: Math.max(0, view.height - top - height),
      },
      { top, left: 0, width: Math.max(0, left), height },
      {
        top,
        left: left + width,
        width: Math.max(0, view.width - left - width),
        height,
      },
    ];
  });

  protected readonly class = computed(() => cn('contents', this.classInput()));
  protected readonly dialogClass = computed(() =>
    cn(
      'fixed inset-0 z-50 m-0 size-full max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-transparent',
      // Interactive: clicks pass through, but where something catches them.
      this.interactive() && 'pointer-events-none',
    ),
  );
  protected readonly dimClass = computed(() =>
    cn(
      'pointer-events-none fixed rounded-lg shadow-[0_0_0_200vmax_rgb(0_0_0/0.5)]',
      this.settled() &&
        'transition-[top,left,width,height] duration-300 ease-out motion-reduce:transition-none',
      this.dimClassInput(),
    ),
  );
  protected readonly cardClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground pointer-events-auto fixed w-80 max-w-[calc(100vw-1rem)] space-y-3 rounded-lg border p-4 shadow-lg outline-none',
      this.settled() &&
        'transition-[top,left] duration-300 ease-out motion-reduce:transition-none',
      this.cardClassInput(),
    ),
  );

  private frame = 0;
  private observed: Element | null = null;
  private opener: HTMLElement | null = null;
  private readonly resize =
    // None on the server: nothing to observe there.
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => this.schedule());

  constructor() {
    const view = this.document.defaultView;
    effect(() => {
      const open = this.open();
      const dialog = this.dialog().nativeElement;
      const interactive = this.interactive();
      untracked(() => {
        if (open && !dialog.open) {
          this.opener = this.document.activeElement as HTMLElement | null;
          if (interactive) dialog.show();
          else dialog.showModal();
        } else if (!open && dialog.open) {
          dialog.close();
          this.settled.set(false);
          // Back where it was (a non-modal dialog may not).
          this.opener?.focus({ preventScroll: true });
        }
      });
    });
    afterRenderEffect(() => {
      const target = this.for();
      if (!this.open()) return;
      untracked(() => this.reveal(target));
    });
    const onMove = () => this.schedule();
    // Interactive: focus can be anywhere — Escape still closes.
    const onKey = (event: KeyboardEvent) => {
      if (this.open() && this.interactive() && event.key === 'Escape') {
        this.close();
      }
    };
    view?.addEventListener('scroll', onMove, { capture: true, passive: true });
    view?.addEventListener('resize', onMove);
    this.document.addEventListener('keydown', onKey);
    inject(DestroyRef).onDestroy(() => {
      view?.removeEventListener('scroll', onMove, { capture: true });
      view?.removeEventListener('resize', onMove);
      this.document.removeEventListener('keydown', onKey);
      this.resize?.disconnect();
      view?.cancelAnimationFrame?.(this.frame);
    });
  }

  show(): void {
    this.open.set(true);
  }

  close(): void {
    this.open.set(false);
  }

  protected onCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }

  /** Modal: a click on the dim (the dialog itself, not its card) closes. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }

  /** The element in view, everything placed, focus on the card. */
  private reveal(target: Element | null): void {
    if (this.observed) this.resize?.unobserve(this.observed);
    this.observed = target;
    if (target) {
      this.resize?.observe(target);
      const still = this.document.defaultView?.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      target.scrollIntoView({
        block: 'center',
        inline: 'nearest',
        behavior: still ? 'instant' : 'smooth',
      });
    }
    this.resize?.observe(this.cardElement().nativeElement);
    this.place();
    this.cardElement().nativeElement.focus({ preventScroll: true });
  }

  private schedule(): void {
    if (!this.resize) return;
    if (!this.open()) return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.place());
  }

  private place(): void {
    const card = this.cardElement().nativeElement;
    const view = this.document.documentElement;
    const viewport = { width: view.clientWidth, height: view.clientHeight };
    this.viewport.set(viewport);
    const placed = spotlightPlacement({
      target: this.for()?.getBoundingClientRect() ?? null,
      card: { width: card.offsetWidth, height: card.offsetHeight },
      viewport,
      side: this.side(),
      padding: this.padding(),
      rtl: getComputedStyle(view).direction === 'rtl',
    });
    this.lit.set(placed.spotlight);
    this.cardAt.set(placed.card);
    this.placed.set(placed.side);
    // Animated from the next move on, not into this first place.
    if (!this.settled())
      requestAnimationFrame(() => this.settled.set(this.open()));
  }
}
