import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { SC_FIELD } from './field';

@Directive({
  selector: '[scFieldDescription]',
  host: {
    'data-slot': 'field-description',
    '[attr.id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScFieldDescription {
  private readonly styles = injectPreset().field;
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-field-description-',
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });

  // Priority: explicit id  > own fallback id
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
    cn(this.styles.description, this.classInput()),
  );
}
