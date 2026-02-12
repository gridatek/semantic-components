import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD_FIELD } from './password-field';

@Component({
  selector: '[sc-password-field-strength]',
  template: `
    @if (passwordField.value()) {
      <div class="mt-2 space-y-1">
        <div class="flex gap-1">
          @for (i of [0, 1, 2, 3]; track i) {
            <div [class]="strengthBarClass(i)"></div>
          }
        </div>
        <p [class]="strengthTextClass()">{{ strengthLabel() }}</p>
      </div>
    }
  `,
  host: {
    'data-slot': 'password-field-strength',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPasswordFieldStrength {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly strength = computed(() => {
    const password = this.passwordField.value();
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

  protected readonly strengthLabel = computed(() => {
    const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
    return labels[this.strength()];
  });

  protected readonly class = computed(() => cn(this.classInput()));

  protected strengthBarClass(index: number): string {
    const strength = this.strength();
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
    );
  }

  protected readonly strengthTextClass = computed(() => {
    const strength = this.strength();
    const colors = [
      'text-red-500',
      'text-orange-500',
      'text-yellow-500',
      'text-lime-500',
      'text-green-500',
    ];
    return cn('text-xs', colors[strength]);
  });
}
