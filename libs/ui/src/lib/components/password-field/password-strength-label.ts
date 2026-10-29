import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPasswordStrength } from './password-strength';

/** The strength in your words — "Weak", "Strong": the meter's value (`aria-valuetext`). */
@Directive({
  selector: '[scPasswordStrengthLabel]',
  host: {
    'data-slot': 'password-strength-label',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScPasswordStrengthLabel {
  private readonly strength = inject(ScPasswordStrength);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-xs', this.classInput()),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const meter = this.strength.element;
    afterRenderEffect({
      write: () => {
        this.strength.score();
        const text = element.textContent?.trim();
        if (text) meter.setAttribute('aria-valuetext', text);
        else meter.removeAttribute('aria-valuetext');
      },
    });
  }
}
