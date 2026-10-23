import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  output,
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
import { ScTourGuideStep } from './tour-guide-step';

/**
 * A guided tour: your steps (`scTourGuideStep`), shown one at a time in
 * a native modal dialog — the page dimmed but for a spotlight on the step's
 * target, the card beside it. Your footer (buttons, progress) goes in it,
 * once, after the steps. ← → step, Escape closes.
 */
@Component({
  selector: '[scTourGuide]',
  exportAs: 'scTourGuide',
  imports: [NgTemplateOutlet],
  template: `
    <dialog
      #dialog
      data-slot="tour-guide-dialog"
      class="m-0 size-full max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-transparent"
      [attr.aria-labelledby]="titleId()"
      [attr.aria-describedby]="descriptionId()"
      (cancel)="onCancel($event)"
      (keydown)="onKeydown($event)"
    >
      <div
        data-slot="tour-guide-spotlight"
        aria-hidden="true"
        [class]="spotlightClass()"
        [style.top.px]="spotlight().top"
        [style.left.px]="spotlight().left"
        [style.width.px]="spotlight().width"
        [style.height.px]="spotlight().height"
      ></div>
      <div
        #card
        data-slot="tour-guide-card"
        tabindex="-1"
        [attr.data-side]="placed()"
        [class]="cardClass()"
        [style.top.px]="cardAt().top"
        [style.left.px]="cardAt().left"
      >
        @if (current(); as step) {
          <ng-container [ngTemplateOutlet]="step.template" />
        }
        <ng-content />
      </div>
    </dialog>
  `,
  host: {
    'data-slot': 'tour-guide',
    '[attr.data-open]': 'open() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTourGuide {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly cardClassInput = input<string>('', { alias: 'cardClass' });

  readonly open = model(false);
  /** The step shown: its place among the steps. */
  readonly step = model(0);
  /** Ended at the last step's Next — not closed. */
  readonly finished = output<void>();

  readonly steps = contentChildren(ScTourGuideStep);
  readonly current = computed<ScTourGuideStep | undefined>(
    () => this.steps()[this.step()],
  );
  readonly count = computed(() => this.steps().length);
  readonly first = computed(() => this.step() === 0);
  readonly last = computed(() => this.step() >= this.count() - 1);

  /** The current step's title and text: named and described by them. */
  readonly ɵtitleId = signal<string | null>(null);
  readonly ɵdescriptionId = signal<string | null>(null);
  protected readonly titleId = this.ɵtitleId.asReadonly();
  protected readonly descriptionId = this.ɵdescriptionId.asReadonly();

  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly cardElement =
    viewChild.required<ElementRef<HTMLElement>>('card');

  /** Where the spotlight and the card are, and the side the card took. */
  protected readonly spotlight = signal<ScPlacementBox>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  protected readonly cardAt = signal({ top: 0, left: 0 });
  protected readonly placed = signal<ScPlacementSide | 'center'>('center');

  /** Placed once since opening: from then on, its moves are animated. */
  protected readonly settled = signal(false);

  protected readonly class = computed(() => cn('contents', this.classInput()));
  protected readonly spotlightClass = computed(() =>
    cn(
      'pointer-events-none fixed rounded-lg shadow-[0_0_0_200vmax_rgb(0_0_0/0.5)]',
      this.settled() &&
        'transition-[top,left,width,height] duration-300 ease-out motion-reduce:transition-none',
    ),
  );
  protected readonly cardClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground fixed w-80 max-w-[calc(100vw-1rem)] space-y-3 rounded-lg border p-4 shadow-lg outline-none',
      this.settled() &&
        'transition-[top,left] duration-300 ease-out motion-reduce:transition-none',
      this.cardClassInput(),
    ),
  );

  private frame = 0;
  private observed: Element | null = null;
  private readonly resize =
    // None on the server: nothing to observe there.
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => this.schedule());

  constructor() {
    const view = this.document.defaultView;
    // Open, closed: the dialog follows.
    effect(() => {
      const open = this.open();
      const dialog = this.dialog().nativeElement;
      untracked(() => {
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) {
          dialog.close();
          this.settled.set(false);
        }
      });
    });
    // A step shown: its target in view, everything placed, focus on the card.
    afterRenderEffect(() => {
      const step = this.current();
      if (!this.open() || !step) return;
      untracked(() => this.show(step));
    });
    // The page scrolled or resized: placed again.
    const onMove = () => this.schedule();
    view?.addEventListener('scroll', onMove, { capture: true, passive: true });
    view?.addEventListener('resize', onMove);
    inject(DestroyRef).onDestroy(() => {
      view?.removeEventListener('scroll', onMove, { capture: true });
      view?.removeEventListener('resize', onMove);
      this.resize?.disconnect();
      view?.cancelAnimationFrame?.(this.frame);
    });
  }

  /** Starts the tour, at `step` (the first). */
  start(step = 0): void {
    this.step.set(Math.min(Math.max(0, step), this.count() - 1));
    this.open.set(true);
  }

  /** The next step — or, at the last, the end: finished. */
  next(): void {
    if (this.last()) {
      this.open.set(false);
      this.finished.emit();
    } else {
      this.step.update((step) => step + 1);
    }
  }

  previous(): void {
    if (!this.first()) this.step.update((step) => step - 1);
  }

  /** Ends the tour, unfinished. */
  close(): void {
    this.open.set(false);
  }

  protected onCancel(event: Event): void {
    // Escape: ours to close (the model follows).
    event.preventDefault();
    this.close();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const forward =
        (event.key === 'ArrowRight') !== (this.direction() === 'rtl');
      event.preventDefault();
      if (forward) {
        if (!this.last()) this.next();
      } else {
        this.previous();
      }
    }
  }

  /** A step: its target scrolled into view, then placed; focus on its card. */
  private show(step: ScTourGuideStep): void {
    const target = step.for();
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

  /** The spotlight on the target; the card on its side — or the other, or shifted — on screen. */
  private place(): void {
    const step = this.current();
    const card = this.cardElement().nativeElement;
    const view = this.document.documentElement;
    const placed = spotlightPlacement({
      target: step?.for()?.getBoundingClientRect() ?? null,
      card: { width: card.offsetWidth, height: card.offsetHeight },
      viewport: { width: view.clientWidth, height: view.clientHeight },
      side: step?.side() ?? 'bottom',
      padding: step?.padding() ?? 0,
      rtl: this.direction() === 'rtl',
    });
    this.spotlight.set(placed.spotlight);
    this.cardAt.set(placed.card);
    this.placed.set(placed.side);
    // Animated from the next move on, not into this first place.
    if (!this.settled())
      requestAnimationFrame(() => this.settled.set(this.open()));
  }

  private direction(): string {
    return getComputedStyle(this.document.documentElement).direction;
  }
}
