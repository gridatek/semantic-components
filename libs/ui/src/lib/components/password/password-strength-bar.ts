import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD_STRENGTH } from './password-strength';

@Directive({
  selector: 'div[scPasswordStrengthBar]',
  host: {
    'data-slot': 'password-strength-bar',
    '[class]': 'class()',
  },
})
export class ScPasswordStrengthBar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly index = input.required<number>();

  private readonly passwordStrength = inject(SC_PASSWORD_STRENGTH);

  protected readonly class = computed(() => {
    const strength = this.passwordStrength.strength();
    const index = this.index();
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-green-500',
    ];

    return cn(
      'h-1 flex-1 rounded-full transition-colors',
      strength >= 0 && index <= strength ? colors[strength] : 'bg-muted',
      this.classInput(),
    );
  });
}
