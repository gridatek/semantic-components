import { Directive, ElementRef, inject, input } from '@angular/core';
import { ScConfetti, type ScConfettiFireworksOptions } from './confetti';

/** Which confetti a click sets off. */
export type ScConfettiEffect = 'burst' | 'sides' | 'fireworks';

/**
 * Confetti on a click: `[scConfettiTrigger]` on a button (or any element) — a
 * burst from its centre by default, its value the options. Behaviour only:
 * the element keeps its own look.
 */
@Directive({
  selector: '[scConfettiTrigger]',
  exportAs: 'scConfettiTrigger',
  host: {
    '(click)': 'fire()',
  },
})
export class ScConfettiTrigger {
  private readonly confetti = inject(ScConfetti);
  private readonly element = inject(ElementRef).nativeElement as Element;

  readonly options = input<ScConfettiFireworksOptions | ''>('', {
    alias: 'scConfettiTrigger',
  });
  readonly effect = input<ScConfettiEffect>('burst', {
    alias: 'confettiEffect',
  });

  /** Sets it off: what the click does. */
  fire(): Promise<void> {
    const options = this.options() || {};
    switch (this.effect()) {
      case 'sides':
        return this.confetti.sides(options);
      case 'fireworks':
        return this.confetti.fireworks(options);
      default:
        return this.confetti.burst({ origin: this.element, ...options });
    }
  }
}
