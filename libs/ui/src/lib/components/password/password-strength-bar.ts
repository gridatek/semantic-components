import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD } from './password';

@Component({
  selector: 'div[scPasswordStrengthBar]',
  template: ``,
  host: {
    'data-slot': 'password-strength-bar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPasswordStrengthBar {
  readonly password = inject(SC_PASSWORD);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly index = input.required<number>();

  protected readonly strength = computed(() => {
    const password = this.password.value();
    if (!password) return 0;

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    // Map to 0-4 scale
    if (score <= 2) return 0;
    if (score <= 3) return 1;
    if (score <= 4) return 2;
    if (score <= 5) return 3;
    return 4;
  });

  protected readonly class = computed(() => {
    const strength = this.strength();
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
      index <= strength ? colors[strength] : 'bg-muted',
      this.classInput(),
    );
  });
}
