import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScSpeedDialNext } from './speed-dial-next';

/** How far the actions are from the button on a quarter circle: per action, and at least. */
const ARC_STEP = 24;
const ARC_MIN = 84;

/** Where each corner's quarter circle starts and ends, in degrees. */
const ARCS: Record<string, [number, number]> = {
  'up-left': [-90, -180],
  'up-right': [-90, 0],
  'down-left': [90, 180],
  'down-right': [90, 0],
};

type Move = 'next' | 'previous' | 'first' | 'last';

/**
 * An action — a menu item: done, the dial closes. Write its icon and its
 * label (`scSpeedDialNextLabel`) inside it — the label is its name. Disabled,
 * it stays reachable, and does nothing.
 */
@Directive({
  selector: 'button[scSpeedDialNextAction]',
  host: {
    type: 'button',
    'data-slot': 'speed-dial-action',
    role: 'menuitem',
    tabindex: '-1',
    // Not natively disabled: a menu item stays reachable.
    '[attr.disabled]': 'null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[style.translate]': 'arcAt()',
    '[style.transition-delay.ms]': 'delay()',
    '[class]': 'class()',
    '(click)': 'dial.close()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScSpeedDialNextAction {
  protected readonly dial = inject(ScSpeedDialNext);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly variant = input<ScButtonVariants['variant']>('secondary');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly index = computed(() =>
    this.dial.ɵactions().indexOf(this.element),
  );

  /** One after the other, opening. */
  protected readonly delay = computed(() =>
    this.dial.open() ? this.index() * 30 : 0,
  );

  /** On a quarter circle: its place on it. */
  protected readonly arcAt = computed(() => {
    const arc = ARCS[this.dial.direction()];
    if (!arc) return null;
    const count = this.dial.ɵactions().length;
    const at = count > 1 ? this.index() / (count - 1) : 0.5;
    const angle = ((arc[0] + (arc[1] - arc[0]) * at) * Math.PI) / 180;
    const radius = Math.max(ARC_MIN, count * ARC_STEP);
    const x = Math.round(Math.cos(angle) * radius);
    const y = Math.round(Math.sin(angle) * radius);
    return `calc(-50% + ${x}px) calc(-50% + ${y}px)`;
  });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'relative rounded-full shadow-md transition-[scale,opacity] duration-200 ease-out',
      'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      this.dial.arc() && 'absolute top-0 left-0',
      !this.dial.open() && 'scale-50 opacity-0',
      this.classInput(),
    ),
  );

  constructor() {
    // In document order.
    this.dial.ɵactions.update((actions) =>
      [...actions, this.element].sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      ),
    );
    // Disabled: no click reaches your handlers.
    const block = (event: Event) => {
      if (!this.disabled()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    this.element.addEventListener('click', block, { capture: true });
    inject(DestroyRef).onDestroy(() => {
      this.element.removeEventListener('click', block, { capture: true });
      this.dial.ɵactions.update((actions) =>
        actions.filter((action) => action !== this.element),
      );
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    const move = this.moves()[event.key];
    if (move) {
      this.dial.ɵmove(this.element, move);
    } else if (event.key === 'Escape') {
      this.dial.close();
    } else if (event.key === 'Tab') {
      // Focus goes on, out of the dial.
      this.dial.close(false);
      return;
    } else {
      return;
    }
    event.preventDefault();
  }

  /** The keys, by the way the actions open: away from the button is next. */
  private moves(): Record<string, Move> {
    const lines: Record<string, [string, string]> = {
      up: ['ArrowUp', 'ArrowDown'],
      down: ['ArrowDown', 'ArrowUp'],
      left: ['ArrowLeft', 'ArrowRight'],
      right: ['ArrowRight', 'ArrowLeft'],
    };
    const ends: Record<string, Move> = { Home: 'first', End: 'last' };
    const line = lines[this.dial.direction()];
    if (line) return { [line[0]]: 'next', [line[1]]: 'previous', ...ends };
    return {
      ArrowDown: 'next',
      ArrowRight: 'next',
      ArrowUp: 'previous',
      ArrowLeft: 'previous',
      ...ends,
    };
  }
}
