import { _IdGenerator } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * Where the actions open: in a line (`up`, `down`, `left`, `right`), or on a
 * quarter circle toward a corner (`up-left`… — for a button in the opposite
 * one).
 */
export type ScSpeedDialDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

/**
 * A floating button that opens a few actions — a menu. Put in it your
 * `scSpeedDialNextTrigger`, your `scSpeedDialNextList` of actions and, if you
 * like, a `scSpeedDialNextBackdrop`. Place it yourself (`fixed bottom-6
 * end-6`…).
 */
@Directive({
  selector: '[scSpeedDialNext]',
  exportAs: 'scSpeedDialNext',
  host: {
    'data-slot': 'speed-dial',
    '[attr.data-open]': 'open() || null',
    '[attr.data-direction]': 'direction()',
    '[class]': 'class()',
  },
})
export class ScSpeedDialNext {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly open = model(false);
  readonly direction = input<ScSpeedDialDirection>('up');

  /** On a quarter circle (a corner's direction), not in a line. */
  readonly arc = computed(() => this.direction().includes('-'));

  readonly triggerId = inject(_IdGenerator).getId('sc-speed-dial-trigger-');
  readonly listId = inject(_IdGenerator).getId('sc-speed-dial-list-');
  /** The actions, in order: registered by `scSpeedDialNextAction`. */
  readonly ɵactions = signal<readonly HTMLElement[]>([]);
  readonly ɵtrigger = signal<HTMLElement | null>(null);

  protected readonly class = computed(() =>
    cn('relative isolate z-10 inline-flex', this.classInput()),
  );

  constructor() {
    const document = inject(DOCUMENT);
    // A press outside closes it.
    const onPointerDown = (event: PointerEvent) => {
      if (this.open() && !this.element.contains(event.target as Node)) {
        this.open.set(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    inject(DestroyRef).onDestroy(() =>
      document.removeEventListener('pointerdown', onPointerDown),
    );
  }

  /** Opens it, on its first action. */
  openOnFirst(): void {
    this.open.set(true);
    // The actions turn reachable once rendered open.
    afterNextRender(() => this.focusAction(this.enabledFirst()), {
      injector: this.injector,
    });
  }

  /** Closes it; back on the trigger, if focus was in it. */
  close(refocus = true): void {
    if (!this.open()) return;
    this.open.set(false);
    if (refocus) this.ɵtrigger()?.focus();
  }

  /** Moves focus `step` actions on (round), or to the first / last. */
  ɵmove(from: HTMLElement, to: 'next' | 'previous' | 'first' | 'last'): void {
    const actions = this.ɵactions();
    if (!actions.length) return;
    const at = actions.indexOf(from);
    const index =
      to === 'first'
        ? 0
        : to === 'last'
          ? actions.length - 1
          : (at + (to === 'next' ? 1 : -1) + actions.length) % actions.length;
    this.focusAction(index);
  }

  private enabledFirst(): number {
    return Math.max(
      0,
      this.ɵactions().findIndex(
        (action) => action.getAttribute('aria-disabled') !== 'true',
      ),
    );
  }

  private focusAction(index: number): void {
    this.ɵactions()[index]?.focus();
  }
}
