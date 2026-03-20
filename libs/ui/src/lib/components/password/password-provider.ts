import {
  Directive,
  InjectionToken,
  computed,
  input,
  model,
} from '@angular/core';
import { cn } from '../../utils';

export const SC_PASSWORD_PROVIDER = new InjectionToken<ScPasswordProvider>(
  'SC_PASSWORD_PROVIDER',
);

@Directive({
  selector: 'div[scPasswordProvider]',
  exportAs: 'scPasswordProvider',
  providers: [
    { provide: SC_PASSWORD_PROVIDER, useExisting: ScPasswordProvider },
  ],
  host: {
    'data-slot': 'password-provider',
    '[class]': 'class()',
  },
})
export class ScPasswordProvider {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('contents', this.classInput()));

  readonly visible = model(false);

  toggle(): void {
    this.visible.update((v) => !v);
  }
}
