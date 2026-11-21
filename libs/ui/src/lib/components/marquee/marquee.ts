import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { cn } from 'cn';
import { ScMarqueeContent } from './marquee-content';

/**
 * Where a marquee moves to: toward the reading start or end (flipped right
 * to left), left or right whatever the page, up or down.
 */
export type ScMarqueeDirection =
  'start' | 'end' | 'left' | 'right' | 'up' | 'down';

/**
 * Content that scrolls by, endlessly: your `scMarqueeContent` template,
 * written once, repeated to fill. It stops under the pointer, with focus
 * inside, when `paused` (`scMarqueePause`) — and does not move at all
 * for reduced motion: it becomes a row to scroll.
 */
@Component({
  selector: '[scMarquee]',
  exportAs: 'scMarquee',
  imports: [NgTemplateOutlet],
  template: `
    <div
      #viewport
      data-slot="marquee-viewport"
      (pointerenter)="hovered.set(true)"
      (pointerleave)="hovered.set(false)"
      (focusin)="focused.set(true)"
      (focusout)="onFocusOut($event)"
      [class]="viewportClass()"
      [style.mask-image]="mask()"
    >
      <div
        #track
        data-slot="marquee-track"
        [class]="flow()"
        [style.gap.px]="gap()"
      >
        @for (copy of copies(); track $index) {
          <div
            #copy
            data-slot="marquee-copy"
            [class]="flow()"
            [style.gap.px]="gap()"
            [attr.aria-hidden]="$index > 0 ? 'true' : null"
            [inert]="$index > 0"
          >
            <ng-container [ngTemplateOutlet]="content()?.template ?? null" />
          </div>
        }
      </div>
    </div>
    <ng-content />
  `,
  host: {
    'data-slot': 'marquee',
    '[attr.data-direction]': 'direction()',
    '[attr.data-paused]': 'paused() || null',
    '[attr.data-still]': 'still() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMarquee {
  readonly classInput = input<string>('', { alias: 'class' });

  /**
   * Where it moves to: toward the reading start (left, or right in a
   * right-to-left page) or end; `left` or `right` whatever the page; up or
   * down.
   */
  readonly direction = input<ScMarqueeDirection>('start');
  private readonly rtl = inject(Directionality).valueSignal;
  /** The way it moves, as a side: start and end turned into left or right, once. */
  private readonly side = computed<'left' | 'right' | 'up' | 'down'>(() => {
    const direction = this.direction();
    const rtl = this.rtl() === 'rtl';
    if (direction === 'start') return rtl ? 'right' : 'left';
    if (direction === 'end') return rtl ? 'left' : 'right';
    return direction;
  });
  /** How fast, in pixels a second — whatever the content's length. */
  readonly speed = input(40);
  /** The space between items, and between copies, in pixels. */
  readonly gap = input(16);
  /** Stopped — by your pause button (WCAG 2.2.2). */
  readonly paused = model(false);
  /** Its edges fade out. */
  readonly fade = input(false, { transform: booleanAttribute });

  /** Under the pointer, or with focus in the content (not the pause button): it waits. */
  private readonly hovered = signal(false);
  private readonly focused = signal(false);
  /** Reduced motion: it does not move. */
  readonly still = signal(false);

  private readonly content = contentChild(ScMarqueeContent);
  private readonly viewport =
    viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly firstCopy = viewChild<ElementRef<HTMLElement>>('copy');

  private readonly vertical = computed(
    () => this.direction() === 'up' || this.direction() === 'down',
  );

  /** The sizes along its way: what shows, one copy. */
  private readonly viewportSize = signal(0);
  private readonly copySize = signal(0);

  /** As many copies as fill what shows, and one more to loop. */
  private readonly copies = computed(() => {
    const copy = this.copySize() + this.gap();
    if (this.still() || !copy || !this.copySize()) return [0];
    return Array.from(
      { length: Math.max(2, Math.ceil(this.viewportSize() / copy) + 1) },
      (_, i) => i,
    );
  });

  private readonly flow = computed(() =>
    cn('flex shrink-0', this.vertical() ? 'flex-col' : 'flex-row items-center'),
  );

  private readonly viewportClass = computed(() =>
    cn(
      'flex min-h-0 min-w-0 flex-1',
      this.vertical() && 'flex-col',
      // Still: a row (or column) to scroll.
      this.still()
        ? this.vertical()
          ? 'overflow-y-auto'
          : 'overflow-x-auto'
        : 'overflow-hidden',
    ),
  );

  private readonly mask = computed(() =>
    this.fade()
      ? `linear-gradient(to ${this.vertical() ? 'bottom' : 'right'}, transparent, black 10%, black 90%, transparent)`
      : null,
  );

  private readonly class = computed(() =>
    cn(
      // The content takes the room; a pause button sits beside it.
      'relative flex gap-2',
      this.vertical() ? 'flex-col' : 'items-center',
      this.classInput(),
    ),
  );

  private animation: Animation | null = null;

  constructor() {
    // No media queries on the server (its window has none).
    const media = inject(DOCUMENT).defaultView?.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    );
    const destroy = inject(DestroyRef);
    if (media) {
      this.still.set(media.matches);
      const onChange = () => this.still.set(media.matches);
      media.addEventListener('change', onChange);
      destroy.onDestroy(() => media.removeEventListener('change', onChange));
    }

    // The sizes, as they change.
    // None on the server: nothing to measure there.
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => this.measure());
    afterRenderEffect(() => {
      const copy = this.firstCopy()?.nativeElement;
      observer?.disconnect();
      observer?.observe(this.viewport().nativeElement);
      if (copy) observer?.observe(copy);
    });
    destroy.onDestroy(() => {
      observer?.disconnect();
      this.animation?.cancel();
    });

    // The motion: one copy's length, at its speed, again and again.
    afterRenderEffect(() => {
      const distance = this.copySize() + this.gap();
      const speed = this.speed();
      const side = this.side();
      const rtl = this.rtl() === 'rtl';
      const still = this.still();
      this.animation?.cancel();
      this.animation = null;
      if (still || !this.copySize() || speed <= 0) return;
      const axis = this.vertical() ? 'Y' : 'X';
      // The copies follow the reading direction — to the left, right to left:
      // the loop's forward way is left, or right right to left (and up).
      const sign = !this.vertical() && rtl ? 1 : -1;
      const from = `translate${axis}(0)`;
      const to = `translate${axis}(${sign * distance}px)`;
      const backwards = this.vertical()
        ? side === 'down'
        : (side === 'left') === rtl;
      this.animation = this.track().nativeElement.animate(
        { transform: backwards ? [to, from] : [from, to] },
        { duration: (distance / speed) * 1000, iterations: Infinity },
      );
      // Paused or not, read apart: a pause must not start it over.
      untracked(() => this.hold());
    });
    afterRenderEffect(() => {
      this.paused();
      this.hovered();
      this.focused();
      this.hold();
    });
  }

  private onFocusOut(event: FocusEvent): void {
    const viewport = this.viewport().nativeElement;
    if (!viewport.contains(event.relatedTarget as Node | null)) {
      this.focused.set(false);
    }
  }

  /** Paused, hovered or focused: it waits where it is. */
  private hold(): void {
    if (!this.animation) return;
    if (this.paused() || this.hovered() || this.focused()) {
      this.animation.pause();
    } else if (this.animation.playState !== 'running') {
      this.animation.play();
    }
  }

  private measure(): void {
    const along = (element: HTMLElement | undefined) =>
      element
        ? this.vertical()
          ? element.getBoundingClientRect().height
          : element.getBoundingClientRect().width
        : 0;
    this.viewportSize.set(along(this.viewport().nativeElement));
    this.copySize.set(along(this.firstCopy()?.nativeElement));
  }
}
