import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD_STRENGTH } from './password-strength';

@Directive({
  selector: 'p[scPasswordStrengthLabel]',
  host: {
    'data-slot': 'password-strength-label',
    '[class]': 'class()',
    '[hidden]': 'hidden()',
  },
})
export class ScPasswordStrengthLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly passwordStrength = inject(SC_PASSWORD_STRENGTH);

  protected readonly hidden = computed(
    () => this.passwordStrength.strength() < 0,
  );

  protected readonly class = computed(() => {
    const strength = this.passwordStrength.strength();
    const colors = [
      'text-red-700',
      'text-orange-700',
      'text-yellow-700',
      'text-lime-700',
      'text-green-700',
    ];
    return cn(
      'text-xs',
      strength >= 0 ? colors[strength] : 'text-muted-foreground',
      this.classInput(),
    );
  });
}
