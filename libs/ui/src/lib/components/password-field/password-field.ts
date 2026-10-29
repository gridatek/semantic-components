import {
  Directive,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScField } from '../field';

/**
 * A password field: its label, its group (the input and the toggle), its
 * descriptions — and what it shows: the password hidden or not (`visible`,
 * two-way), Caps Lock while it is on. A `scField` underneath: the label, the
 * descriptions and Signal Forms work as in any field.
 */
@Directive({
  selector: 'div[scPasswordField]',
  exportAs: 'scPasswordField',
  hostDirectives: [
    {
      directive: ScField,
      inputs: ['id', 'orientation', 'invalid', 'disabled'],
    },
  ],
  host: {
    '[attr.data-visible]': 'visible() || null',
    '[class]': 'class()',
  },
})
export class ScPasswordField {
  /** The field underneath: the input's id, its descriptions, its form field. */
  readonly field = inject(ScField);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The password shown as text. */
  readonly visible = model(false);

  /** Caps Lock on, while the input has the focus. */
  readonly capsLock = signal(false);
  /** The input, once there: for the toggle and the generator. */
  readonly input = signal<HTMLInputElement | null>(null);

  readonly disabled = computed(() => this.field.disabled());

  protected readonly class = computed(() => cn(this.classInput()));

  toggle(): void {
    this.visible.update((visible) => !visible);
  }
}
