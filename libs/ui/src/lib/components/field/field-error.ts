import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { _IdGenerator } from '@angular/cdk/a11y';
import { cn } from '../../utils';
import { SC_FIELD } from './field';

@Component({
  selector: '[scFieldError]',
  template: `
    @if (errors().length) {
      <ul>
        @for (error of errors(); track error.kind) {
          <li>{{ error.message }}</li>
        }
      </ul>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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

  protected readonly errors = computed(() => {
    const formField = this.field?.formField();
    if (!formField) return [];

    const state = formField.state();
    if (state.touched() && state.invalid()) {
      return state.errors();
    }

    return [];
  });

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
