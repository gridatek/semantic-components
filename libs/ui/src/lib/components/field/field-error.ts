import {
  computed,
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { _IdGenerator } from '@angular/cdk/a11y';
import { SC_FIELD } from './field';

@Directive({
  selector: '[scFieldError]',
  host: {
    'data-slot': 'field-error',
    '[attr.id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScFieldError {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-field-error-');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });

  // Priority: explicit id > own fallback id
  readonly id = computed(() => this.idInput() || this.fallbackId);

  constructor() {
    effect(() => {
      const id = this.id();
      this.field?.descriptionIds.update((ids) => [...ids, id]);
    });

    inject(DestroyRef).onDestroy(() => {
      const id = this.id();
      this.field?.descriptionIds.update((ids) => ids.filter((i) => i !== id));
    });
  }

  protected readonly class = computed(() =>
    cn('text-destructive text-sm font-normal', this.classInput()),
  );
}
