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
  readonly strength = input<number>(0);

  protected readonly class = computed(() =>
    cn('mt-2 space-y-1', this.classInput()),
  );
}
