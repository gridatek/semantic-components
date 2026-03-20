import { Directive, InjectionToken, computed, input } from '@angular/core';
import { cn } from '../../utils';

export const SC_PASSWORD_STRENGTH = new InjectionToken<ScPasswordStrength>(
  'SC_PASSWORD_STRENGTH',
);

@Directive({
  selector: 'div[scPasswordStrength]',
  exportAs: 'scPasswordStrength',
  providers: [
    { provide: SC_PASSWORD_STRENGTH, useExisting: ScPasswordStrength },
  ],
  host: {
    'data-slot': 'password-strength',
    '[class]': 'class()',
  },
})
export class ScPasswordStrength {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input<string>('');
  readonly rules = input<((v: string) => boolean)[]>([
    (v) => v.length >= 8,
    (v) => v.length >= 12,
    (v) => /[A-Z]/.test(v),
    (v) => /[a-z]/.test(v),
    (v) => /\d/.test(v),
    (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
  ]);
  readonly strength = computed(() => {
    const password = this.value();
    if (!password) return 0;

    const rules = this.rules();
    const score = rules.filter((rule) => rule(password)).length;
    const max = rules.length;
    if (max === 0) return 0;

    return Math.round((score / max) * 4);
  });

  protected readonly class = computed(() =>
    cn('mt-2 space-y-1', this.classInput()),
  );
}
