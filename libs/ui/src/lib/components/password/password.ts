import {
  Directive,
  InjectionToken,
  computed,
  input,
  model,
} from '@angular/core';
import { cn } from '../../utils';

export const SC_PASSWORD = new InjectionToken<ScPassword>('SC_PASSWORD');

@Directive({
  selector: 'div[scPassword]',
  exportAs: 'scPassword',
  providers: [{ provide: SC_PASSWORD, useExisting: ScPassword }],
  host: {
    'data-slot': 'password',
    '[class]': 'class()',
  },
})
export class ScPassword {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly visible = model(false);

  toggle(): void {
    this.visible.update((v) => !v);
  }
}
