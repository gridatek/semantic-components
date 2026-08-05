import {
  Directive,
  InjectionToken,
  computed,
  contentChild,
  input,
  model,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
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
    '[class]': 'class()',
  },
})
export class ScPasswordProvider {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('contents', this.classInput()));

  readonly visible = model(false);

  /**
   * The field lives on the input, which is a descendant, so it cannot be
   * injected from here — it has to be queried. The toggle is a sibling of the
   * input and cannot reach it at all, so the provider reads the state on its
   * behalf.
   */
  private readonly formField = contentChild(FormField);

  readonly disabled = computed(
    () => this.formField()?.state().disabled() ?? false,
  );

  toggle(): void {
    this.visible.update((v) => !v);
  }
}
